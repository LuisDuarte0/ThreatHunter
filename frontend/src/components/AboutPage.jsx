import React from 'react';

const AboutPage = ({ onNavigate }) => {
  const technologies = [
    { name: 'React', icon: '⚛️', description: 'Framework frontend para construir interfaces de usuário' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Framework CSS utilitário para estilização' },
    { name: 'FastAPI', icon: '🚀', description: 'Framework web moderno em Python para APIs' },
    { name: 'SQLite', icon: '🗄️', description: 'Banco de dados leve para armazenamento de dados' },
    { name: 'Scikit-learn', icon: '🧠', description: 'Biblioteca de machine learning para detecção de ameaças' },
    { name: 'Recharts', icon: '📊', description: 'Biblioteca React para visualização de gráficos' }
  ];

  const features = [
    { title: 'Detecção Avançada de Ameaças', icon: '🔍', description: 'Análise com IA capaz de identificar ameaças críticas, como as do OWASP Top 10, e outras tentativas suspeitas.' },
    { title: 'Análise em Tempo Real', icon: '⚡', description: 'Processamento instantâneo de arquivos de log com identificação imediata de padrões de ataque.' },
    { title: 'Dashboard Interativo', icon: '📊', description: 'Visualização gráfica de métricas de segurança e tendências de atividades maliciosas.' },
    { title: 'Rastreamento Histórico', icon: '📚', description: 'Registro completo e detalhado de todas as análises realizadas.' },
    { title: 'Interface Cyberpunk', icon: '🌐', description: 'Tema escuro com toques neon, inspirado em um estilo Cyberpunk futurista.' },
    { title: 'Autenticação Segura', icon: '🔐', description: 'Sistema de login robusto utilizando autenticação baseada em JWT.' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="glitch text-3xl font-bold mb-4 text-center" data-text="ABOUT THREAT HUNTER">
          SOBRE
        </h1>
        <p className="text-muted-foreground text-lg text-center">
          Plataforma de análise cibernética avançada para detecção de ameaças e análise de logs
        </p>
      </div>

      {/* Visão Geral do Projeto */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary text-center">Visão Geral do Projeto</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Threat Hunter é uma plataforma abrangente de análise cibernética projetada para ajudar profissionais de segurança 
          a identificar e analisar ameaças potenciais em arquivos de log. Utilizando inteligência artificial avançada e técnicas 
          de machine learning, a plataforma consegue detectar diversos tipos de ataques, incluindo os listados no OWASP Top 10, 
          oferecendo análises detalhadas e insights acionáveis.
        </p>
        <p className="text-foreground leading-relaxed">
          A plataforma combina tecnologias web modernas com algoritmos sofisticados de detecção de ameaças para entregar 
          uma ferramenta profissional de análise de segurança. Com sua interface inspirada no estilo cyberpunk e capacidades 
          de processamento em tempo real, o Threat Hunter torna a análise de segurança tanto poderosa quanto visualmente envolvente.
        </p>
      </div>

      {/* Principais Funcionalidades */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Principais Funcionalidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-4 rounded border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tecnologia Utilizada */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Tecnologias Utilizadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="p-4 rounded border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{tech.icon}</span>
                <h3 className="font-semibold text-foreground">{tech.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detecção de Ameaças - OWASP */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Detecção de Ameaças - OWASP</h2>
        <p className="text-foreground mb-4">
          Nosso motor de análise com IA foi projetado especificamente para identificar ameaças da lista OWASP Top 10 
          e outros vetores comuns de ataque:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-destructive">💉</span>
              <span>SQL Injection</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-accent">🔗</span>
              <span>Cross-Site Scripting (XSS)</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">📁</span>
              <span>Directory Traversal</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-destructive">⚡</span>
              <span>Command Injection</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-accent">🔨</span>
              <span>Brute Force</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">👁️</span>
              <span>Atividades Suspeitas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chamada para Ação */}
      <div className="cyber-card text-center">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Pronto para Começar?</h2>
        <p className="text-muted-foreground mb-6">
          Comece a analisar seus arquivos de log e detectar ameaças com nossa plataforma avançada com IA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('upload')}
            className="cyber-button neon-glow px-8 py-3"
          >
            Enviar Arquivo de Log
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="cyber-button px-8 py-3"
          >
            Ver Dashboard
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2024 Threat Hunter - Plataforma de Análise Cibernética Avançada</p>
        <p className="mt-2">Construído com React, FastAPI e detecção de ameaças com IA</p>
      </div>
    </div>
  );
};

export default AboutPage;
