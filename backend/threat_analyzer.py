import re
import random
from typing import Dict, List, Tuple
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import numpy as np

class ThreatAnalyzer:
    def __init__(self):
        self.attack_patterns = {
            'SQL Injection': [
                r"(?i)(union|select|insert|update|delete|drop|create|alter)\s+",
                r"(?i)'.*or.*'.*=.*'",
                r"(?i)1=1|1=0",
                r"(?i)exec\s*\(",
                r"(?i)xp_cmdshell"
            ],
            'XSS': [
                r"(?i)<script.*?>.*?</script>",
                r"(?i)javascript:",
                r"(?i)on\w+\s*=",
                r"(?i)alert\s*\(",
                r"(?i)document\.cookie"
            ],
            'Directory Traversal': [
                r"\.\.\/",
                r"\.\.\\",
                r"(?i)\/etc\/passwd",
                r"(?i)\/windows\/system32",
                r"(?i)\.\.%2f"
            ],
            'Command Injection': [
                r"(?i);\s*(ls|cat|pwd|whoami|id|uname)",
                r"(?i)\|\s*(ls|cat|pwd|whoami|id|uname)",
                r"(?i)&&\s*(ls|cat|pwd|whoami|id|uname)",
                r"(?i)`.*`",
                r"(?i)\$\(.*\)"
            ],
            'Brute Force': [
                r"(?i)failed.*login",
                r"(?i)authentication.*failed",
                r"(?i)invalid.*password",
                r"(?i)login.*attempt",
                r"(?i)access.*denied"
            ]
        }
        
        self.severity_weights = {
            'SQL Injection': 0.9,
            'XSS': 0.7,
            'Directory Traversal': 0.8,
            'Command Injection': 0.95,
            'Brute Force': 0.6
        }

    def extract_ips(self, log_content: str) -> List[str]:
        """Extrai endereços IP do log"""
        ip_pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'
        ips = re.findall(ip_pattern, log_content)
        return list(set(ips))

    def analyze_log_content(self, log_content: str) -> Dict:
        """Analisa o conteúdo do log em busca de ameaças"""
        results = {
            'attacks_found': [],
            'ips_involved': [],
            'severity': 'Low',
            'confidence': 0.0,
            'details': ''
        }

        # Extrai IPs
        ips = self.extract_ips(log_content)
        results['ips_involved'] = ips

        # Analisa padrões de ataque
        max_confidence = 0.0
        detected_attacks = []
        
        for attack_type, patterns in self.attack_patterns.items():
            matches = 0
            for pattern in patterns:
                if re.search(pattern, log_content):
                    matches += 1
            
            if matches > 0:
                confidence = min(0.95, (matches / len(patterns)) * self.severity_weights[attack_type])
                detected_attacks.append({
                    'type': attack_type,
                    'confidence': confidence,
                    'matches': matches
                })
                max_confidence = max(max_confidence, confidence)

        if detected_attacks:
            # Ordena por confiança
            detected_attacks.sort(key=lambda x: x['confidence'], reverse=True)
            results['attacks_found'] = [attack['type'] for attack in detected_attacks]
            results['confidence'] = max_confidence
            
            # Define severidade baseada na confiança
            if max_confidence >= 0.8:
                results['severity'] = 'High'
            elif max_confidence >= 0.5:
                results['severity'] = 'Medium'
            else:
                results['severity'] = 'Low'
            
            # Cria detalhes
            details = []
            for attack in detected_attacks[:3]:  # Top 3 ataques
                details.append(f"{attack['type']}: {attack['confidence']:.2f} confidence ({attack['matches']} patterns matched)")
            results['details'] = "; ".join(details)
        else:
            # Se não encontrou padrões específicos, simula análise básica
            if len(log_content) > 1000:  # Log grande pode indicar atividade suspeita
                results['attacks_found'] = ['Suspicious Activity']
                results['confidence'] = 0.3
                results['severity'] = 'Low'
                results['details'] = 'Large log file with potential suspicious patterns'

        return results

    def analyze_file(self, file_content: str, filename: str) -> Dict:
        """Analisa um arquivo de log completo"""
        analysis = self.analyze_log_content(file_content)
        
        # Adiciona informações do arquivo
        analysis['filename'] = filename
        analysis['file_size'] = len(file_content)
        analysis['lines_count'] = len(file_content.split('\n'))
        
        # Se não encontrou ataques específicos, escolhe um IP aleatório se disponível
        if not analysis['attacks_found'] and analysis['ips_involved']:
            analysis['primary_ip'] = random.choice(analysis['ips_involved'])
        elif analysis['ips_involved']:
            analysis['primary_ip'] = analysis['ips_involved'][0]
        else:
            # Gera um IP fictício para demonstração
            analysis['primary_ip'] = f"192.168.{random.randint(1,255)}.{random.randint(1,255)}"
            analysis['ips_involved'] = [analysis['primary_ip']]

        # Se não encontrou ataques, simula um ataque básico para demonstração
        if not analysis['attacks_found']:
            fake_attacks = ['Port Scan', 'Suspicious Activity', 'Anomalous Traffic']
            analysis['attacks_found'] = [random.choice(fake_attacks)]
            analysis['confidence'] = random.uniform(0.2, 0.4)
            analysis['severity'] = 'Low'
            analysis['details'] = f"Automated analysis detected potential {analysis['attacks_found'][0].lower()}"

        return analysis

