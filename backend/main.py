from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
import uvicorn
from datetime import timedelta

from database import get_db, create_tables, User, LogAnalysis
from auth import (
    UserCreate, UserLogin, UserResponse, Token,
    get_password_hash, verify_password, create_access_token,
    verify_token, ACCESS_TOKEN_EXPIRE_MINUTES
)
from threat_analyzer import ThreatAnalyzer

app = FastAPI(title="Threat Hunter API", version="1.0.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()
threat_analyzer = ThreatAnalyzer()

# Criar tabelas na inicialização
create_tables()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token_data = verify_token(credentials.credentials)
    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar se usuário já existe
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Criar novo usuário
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return UserResponse(id=db_user.id, email=db_user.email, created_at=db_user.created_at)

@app.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    # Verificar credenciais
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Criar token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/upload-log")
async def upload_log(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verificar tipo de arquivo
    if not file.filename.endswith('.log'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .log files are allowed"
        )
    
    # Ler conteúdo do arquivo
    content = await file.read()
    file_content = content.decode('utf-8', errors='ignore')
    
    # Analisar o log
    analysis_result = threat_analyzer.analyze_file(file_content, file.filename)
    
    # Salvar no banco de dados
    log_analysis = LogAnalysis(
        user_id=current_user.id,
        filename=file.filename,
        ip_address=analysis_result.get('primary_ip', 'Unknown'),
        attack_type=', '.join(analysis_result['attacks_found']) if analysis_result['attacks_found'] else 'None',
        severity=analysis_result['severity'],
        confidence=analysis_result['confidence'],
        details=analysis_result['details']
    )
    
    db.add(log_analysis)
    db.commit()
    db.refresh(log_analysis)
    
    return {
        "id": log_analysis.id,
        "filename": file.filename,
        "analysis": analysis_result,
        "message": "Log analyzed successfully"
    }

@app.get("/dashboard/stats")
def get_dashboard_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Buscar todas as análises do usuário
    analyses = db.query(LogAnalysis).filter(LogAnalysis.user_id == current_user.id).all()
    
    # Estatísticas de tipos de ataque
    attack_types = {}
    ip_counts = {}
    recent_logs = []
    
    for analysis in analyses:
        # Contar tipos de ataque
        if analysis.attack_type and analysis.attack_type != 'None':
            attacks = [attack.strip() for attack in analysis.attack_type.split(',')]
            for attack in attacks:
                attack_types[attack] = attack_types.get(attack, 0) + 1
        
        # Contar IPs
        if analysis.ip_address and analysis.ip_address != 'Unknown':
            ip_counts[analysis.ip_address] = ip_counts.get(analysis.ip_address, 0) + 1
        
        # Logs recentes (últimos 10)
        recent_logs.append({
            "id": analysis.id,
            "filename": analysis.filename,
            "ip_address": analysis.ip_address,
            "attack_type": analysis.attack_type,
            "severity": analysis.severity,
            "created_at": analysis.created_at.isoformat()
        })
    
    # Ordenar logs recentes por data
    recent_logs.sort(key=lambda x: x['created_at'], reverse=True)
    recent_logs = recent_logs[:10]
    
    # Preparar dados para gráficos
    attack_chart_data = [{"name": k, "value": v} for k, v in attack_types.items()]
    ip_chart_data = [{"name": k, "value": v} for k, v in sorted(ip_counts.items(), key=lambda x: x[1], reverse=True)[:10]]
    
    return {
        "total_logs": len(analyses),
        "attack_types": attack_chart_data,
        "top_ips": ip_chart_data,
        "recent_logs": recent_logs,
        "severity_distribution": {
            "High": len([a for a in analyses if a.severity == 'High']),
            "Medium": len([a for a in analyses if a.severity == 'Medium']),
            "Low": len([a for a in analyses if a.severity == 'Low'])
        }
    }

@app.get("/history")
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    analyses = db.query(LogAnalysis).filter(LogAnalysis.user_id == current_user.id).order_by(LogAnalysis.created_at.desc()).all()
    
    history = []
    for analysis in analyses:
        history.append({
            "id": analysis.id,
            "filename": analysis.filename,
            "ip_address": analysis.ip_address,
            "attack_type": analysis.attack_type,
            "severity": analysis.severity,
            "confidence": analysis.confidence,
            "details": analysis.details,
            "created_at": analysis.created_at.isoformat()
        })
    
    return {"history": history}

@app.get("/history/{log_id}")
def get_log_details(log_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    analysis = db.query(LogAnalysis).filter(
        LogAnalysis.id == log_id,
        LogAnalysis.user_id == current_user.id
    ).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Log analysis not found"
        )
    
    return {
        "id": analysis.id,
        "filename": analysis.filename,
        "ip_address": analysis.ip_address,
        "attack_type": analysis.attack_type,
        "severity": analysis.severity,
        "confidence": analysis.confidence,
        "details": analysis.details,
        "created_at": analysis.created_at.isoformat()
    }

@app.get("/")
def root():
    return {"message": "Threat Hunter API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

