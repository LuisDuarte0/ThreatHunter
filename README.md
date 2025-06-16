# Threat Hunter - Cybersecurity Analysis Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## Descrição

Threat Hunter é uma plataforma  de análise de segurança cibernética que utiliza inteligência artificial (a ideia é poder expandir isso com diversas IAs, mas por agora, o sistema de IA está treinando em Scikit-learn) para detectar e analisar ameaças em arquivos de log. O sistema é capaz de identificar diversos tipos de ataques, incluindo aqueles listados no OWASP Top 10, fornecendo análises detalhadas.

## Características Principais

- **🔍 Detecção Avançada de Ameaças**: IA para identificar ameaças OWASP Top 10 e outros vetores de ataque
- **⚡ Análise em Tempo Real**: Processamento instantâneo de logs e identificação de ameaças
- **📊 Dashboard Interativo**: Visualização de métricas de segurança e tendências
- **📚 Rastreamento Histórico**: Trilha de auditoria completa de todas as análises
- **🔐 Autenticação Segura**: Sistema de autenticação baseado em JWT (JSON Web Tokens no Python)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS 
- **Recharts** - Biblioteca de gráficos instalada para React que utilizei no Dashboard
- **Vite** - Build tool e servidor de desenvolvimento

### Backend
- **FastAPI** - Framework Python moderno para APIs
- **SQLAlchemy** - ORM para Python
- **SQLite** - Banco de dados leve
- **Scikit-learn** - Biblioteca de machine learning
- **Python-JOSE** - Implementação JWT para Python
- **Passlib** - Biblioteca para hash de senhas

## 🚀 Instalação e Execução

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- npm 

### Backend

1. **Navegue para o diretório do backend:**
   ```bash
   cd backend
   ```

2. **Crie e ative o ambiente virtual:**
   ```bash
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute o servidor:**
   ```bash
   python main.py
   ```

O backend estará disponível em `http://localhost:8000`

### Frontend

1. **Navegue para o diretório do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O frontend estará disponível em `http://localhost:5173`

## 📖 Como Usar

### 1. Registro e Login
- Acesse a aplicação em `http://localhost:5173`
- Registre uma nova conta ou faça login com credenciais existentes

### 2. Upload de Logs
- Navegue para a seção "Upload Logs"
- Selecione um arquivo `.log` para análise
- Clique em "Upload & Analyze" para processar o arquivo

### 3. Visualização de Resultados
- **Dashboard**: Visualize estatísticas gerais, gráficos de distribuição de ataques e IPs mais frequentes
- **Histórico**: Acesse o histórico completo de análises com opção de ver detalhes
- **Detalhes**: Clique em "Details" para ver informações completas sobre uma análise específica

## Tipos de Ameaças Detectadas

O sistema é capaz de detectar os seguintes tipos de ataques:

- **💉 SQL Injection**: Padrões de injeção de SQL
- **🔗 Cross-Site Scripting (XSS)**: Scripts maliciosos em páginas web
- **📁 Directory Traversal**: Manipulação de caminhos de arquivo
- **⚡ Command Injection**: Execução de comandos do sistema
- **🔨 Brute Force**: Ataques de força bruta em autenticação
- **👁️ Suspicious Activity**: Padrões de atividade anômalos

## Estrutura do Projeto

```
threat-hunter/
├── backend/
│   ├── venv/                 # Ambiente virtual Python
│   ├── main.py              # Arquivo principal do FastAPI
│   ├── database.py          # Configuração do banco de dados
│   ├── auth.py              # Sistema de autenticação
│   ├── threat_analyzer.py   # Analisador de ameaças com IA
│   ├── requirements.txt     # Dependências Python
│   └── threat_hunter.db     # Banco de dados SQLite
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── App.jsx         # Componente principal
│   │   └── App.css         # Estilos cyberpunk
│   ├── package.json        # Dependências Node.js
│   └── index.html          # Template HTML
└── README.md               # Este arquivo
```

## Tema Visual

Tentei me inspirar em uma temática cyberpunk:

- **Cores principais:**
  - Fundo: `#0f0f0f`
  - Cards: `#1f1f1f`
  - Neon Verde: `#00ff9f`
  - Neon Rosa: `#f800ff`

- **Efeitos especiais:**
  - Efeito glitch nos títulos
  - Glow neon nos botões
  - Animações de scan nos cards
  - Fonte JetBrains Mono

## API Endpoints

### Autenticação
- `POST /register` - Registro de usuário
- `POST /login` - Login de usuário

### Análise de Logs
- `POST /upload-log` - Upload e análise de arquivo de log
- `GET /dashboard/stats` - Estatísticas do dashboard
- `GET /history` - Histórico de análises
- `GET /history/{log_id}` - Detalhes de uma análise específica

---

**© 2025 Threat Hunter - Advanced Cybersecurity Analysis Platform**

*Built with React, FastAPI, and AI-powered threat detection*
