import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';

const UploadPage = ({ onAnalysisComplete, onNavigate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.log')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please select a .log file');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        onNavigate('login');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/upload-log', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysisResult(data);
        onAnalysisComplete(data);
      } else {
        if (response.status === 401) {
          localStorage.removeItem('token');
          onNavigate('login');
        } else {
          setError(data.detail || 'Upload failed');
        }
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setUploading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-accent';
      case 'low': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="glitch text-3xl font-bold mb-4" data-text="LOG ANALYSIS">
          LOG ANALYSIS
        </h1>
        <p className="text-muted-foreground">
          Upload your log files for advanced threat detection and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full max-w-6xl mx-auto">
        <div className="cyber-card flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4 text-primary">Upload Log File</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                Select Log File (.log)
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".log"
                onChange={handleFileSelect}
                className="cyber-input w-full"
              />
            </div>

            {selectedFile && (
              <div className="p-3 rounded bg-muted border border-border">
                <p className="text-sm">
                  <span className="font-medium">Selected:</span> {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 rounded bg-destructive/10 border border-destructive text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="cyber-button w-full neon-glow"
            >
              {uploading ? 'Analyzing...' : 'Upload & Analyze'}
            </Button>
          </div>
        </div>

        {analysisResult && (
          <div className="cyber-card flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-primary">Analysis Results</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">File</p>
                  <p className="font-medium">{analysisResult.filename}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Severity</p>
                  <p className={`font-medium ${getSeverityColor(analysisResult.analysis.severity)}`}>
                    {analysisResult.analysis.severity}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Primary IP</p>
                <p className="font-medium font-mono">{analysisResult.analysis.primary_ip}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Detected Threats</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {analysisResult.analysis.attacks_found.map((attack, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs bg-accent/20 text-accent border border-accent/30"
                    >
                      {attack}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${(analysisResult.analysis.confidence * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {(analysisResult.analysis.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {analysisResult.analysis.details && (
                <div>
                  <p className="text-sm text-muted-foreground">Details</p>
                  <p className="text-sm bg-muted p-3 rounded font-mono">
                    {analysisResult.analysis.details}
                  </p>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={() => onNavigate('dashboard')}
                  className="cyber-button flex-1"
                >
                  View Dashboard
                </Button>
                <Button
                  onClick={() => onNavigate('history')}
                  className="cyber-button flex-1"
                >
                  View History
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 cyber-card">
        <h3 className="text-lg font-semibold mb-4 text-primary">Supported Threat Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'SQL Injection', icon: '💉', desc: 'Database attack patterns' },
            { name: 'XSS', icon: '🔗', desc: 'Cross-site scripting' },
            { name: 'Directory Traversal', icon: '📁', desc: 'Path manipulation' },
            { name: 'Command Injection', icon: '⚡', desc: 'System command execution' },
            { name: 'Brute Force', icon: '🔨', desc: 'Authentication attacks' },
            { name: 'Suspicious Activity', icon: '👁️', desc: 'Anomalous patterns' }
          ].map((threat, index) => (
            <div key={index} className="p-3 rounded border border-border bg-muted/50">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{threat.icon}</span>
                <span className="font-medium text-sm">{threat.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{threat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;

