import React from 'react';

const AboutPage = ({ onNavigate }) => {
  const technologies = [
    { name: 'React', icon: '⚛️', description: 'Frontend framework for building user interfaces' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework for styling' },
    { name: 'FastAPI', icon: '🚀', description: 'Modern Python web framework for APIs' },
    { name: 'SQLite', icon: '🗄️', description: 'Lightweight database for data storage' },
    { name: 'Scikit-learn', icon: '🧠', description: 'Machine learning library for threat detection' },
    { name: 'Recharts', icon: '📊', description: 'React charting library for data visualization' }
  ];

  const features = [
    { title: 'Advanced Threat Detection', icon: '🔍', description: 'AI-powered analysis to identify OWASP Top 10 threats and more' },
    { title: 'Real-time Analysis', icon: '⚡', description: 'Instant log processing and threat identification' },
    { title: 'Interactive Dashboard', icon: '📊', description: 'Visual representation of security metrics and trends' },
    { title: 'Historical Tracking', icon: '📚', description: 'Complete audit trail of all security analyses' },
    { title: 'Cyberpunk Interface', icon: '🌐', description: 'Professional dark theme with neon accents' },
    { title: 'Secure Authentication', icon: '🔐', description: 'JWT-based authentication system' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="glitch text-3xl font-bold mb-4" data-text="ABOUT THREAT HUNTER">
          ABOUT THREAT HUNTER
        </h1>
        <p className="text-muted-foreground text-lg">
          Advanced cybersecurity analysis platform for threat detection and log analysis
        </p>
      </div>

      {/* Project Overview */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Project Overview</h2>
        <p className="text-foreground leading-relaxed mb-4">
          Threat Hunter is a comprehensive cybersecurity analysis platform designed to help security professionals 
          identify and analyze potential threats in log files. Using advanced artificial intelligence and machine 
          learning techniques, the platform can detect various types of attacks including those listed in the 
          OWASP Top 10, providing detailed analysis and actionable insights.
        </p>
        <p className="text-foreground leading-relaxed">
          The platform combines modern web technologies with sophisticated threat detection algorithms to deliver 
          a professional-grade security analysis tool. With its cyberpunk-inspired interface and real-time 
          processing capabilities, Threat Hunter makes cybersecurity analysis both powerful and visually engaging.
        </p>
      </div>

      {/* Key Features */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Key Features</h2>
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

      {/* Technology Stack */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Technology Stack</h2>
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

      {/* OWASP Threat Detection */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary">OWASP Threat Detection</h2>
        <p className="text-foreground mb-4">
          Our AI-powered analysis engine is specifically designed to identify threats from the OWASP Top 10 
          and other common attack vectors:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-destructive">💉</span>
              <span>SQL Injection Attacks</span>
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
              <span>Brute Force Attacks</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">👁️</span>
              <span>Suspicious Activity Patterns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="cyber-card mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Security & Privacy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Secure Authentication</h3>
            <p className="text-sm text-muted-foreground">
              JWT-based authentication with secure password hashing
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="font-semibold mb-2">Data Protection</h3>
            <p className="text-sm text-muted-foreground">
              All data is processed securely with encryption at rest
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Fast Processing</h3>
            <p className="text-sm text-muted-foreground">
              Optimized algorithms for real-time threat analysis
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cyber-card text-center">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Ready to Start?</h2>
        <p className="text-muted-foreground mb-6">
          Begin analyzing your log files and detecting threats with our advanced AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('upload')}
            className="cyber-button neon-glow px-8 py-3"
          >
            Upload Log File
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="cyber-button px-8 py-3"
          >
            View Dashboard
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2024 Threat Hunter - Advanced Cybersecurity Analysis Platform</p>
        <p className="mt-2">Built with React, FastAPI, and AI-powered threat detection</p>
      </div>
    </div>
  );
};

export default AboutPage;

