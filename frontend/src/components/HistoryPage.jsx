import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';

const HistoryPage = ({ onAnalysisSelect, onNavigate }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        onNavigate('login');
        return;
      }

      const response = await fetch('http://localhost:8000/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setHistory(data.history);
      } else {
        if (response.status === 401) {
          localStorage.removeItem('token');
          onNavigate('login');
        } else {
          setError(data.detail || 'Failed to load history');
        }
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLogDetails = async (logId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/history/${logId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSelectedLog(data);
        setShowDetails(true);
        onAnalysisSelect(data);
      } else {
        setError(data.detail || 'Failed to load log details');
      }
    } catch (err) {
      setError('Failed to load log details');
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

  const getSeverityBadgeColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-accent/20 text-accent border-accent/30';
      case 'low': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="glitch text-3xl font-bold mb-4" data-text="ANALYSIS HISTORY">
          ANALYSIS HISTORY
        </h1>
        <p className="text-muted-foreground">
          Complete history of your log analysis and threat detection results
        </p>
      </div>

      {error && (
        <div className="cyber-card mb-6">
          <div className="p-3 rounded bg-destructive/10 border border-destructive text-destructive text-sm">
            {error}
          </div>
          <Button onClick={fetchHistory} className="cyber-button mt-4">
            Retry
          </Button>
        </div>
      )}

      {history.length === 0 ? (
        <div className="cyber-card text-center">
          <div className="py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">No Analysis History</h3>
            <p className="text-muted-foreground mb-6">
              You haven't analyzed any log files yet. Upload your first log file to get started.
            </p>
            <Button onClick={() => onNavigate('upload')} className="cyber-button neon-glow">
              Upload Log File
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* History List */}
          <div className="cyber-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">Log Analysis History</h2>
              <Button onClick={fetchHistory} className="cyber-button">
                Refresh
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground">Date</th>
                    <th className="text-left p-3 text-muted-foreground">File</th>
                    <th className="text-left p-3 text-muted-foreground">IP Address</th>
                    <th className="text-left p-3 text-muted-foreground">Attack Type</th>
                    <th className="text-left p-3 text-muted-foreground">Severity</th>
                    <th className="text-left p-3 text-muted-foreground">Confidence</th>
                    <th className="text-left p-3 text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((log) => (
                    <tr key={log.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-3 text-sm font-mono">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="p-3 text-sm max-w-xs truncate" title={log.filename}>
                        {log.filename}
                      </td>
                      <td className="p-3 text-sm font-mono">{log.ip_address}</td>
                      <td className="p-3 text-sm">
                        <span className="px-2 py-1 rounded text-xs bg-accent/20 text-accent border border-accent/30">
                          {log.attack_type}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs border ${getSeverityBadgeColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-2 w-16">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${(log.confidence * 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">
                            {(log.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Button
                          onClick={() => fetchLogDetails(log.id)}
                          className="cyber-button text-xs px-3 py-1"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Modal */}
          {showDetails && selectedLog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="cyber-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-primary">Analysis Details</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="cyber-button-danger px-3 py-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">File Name</p>
                      <p className="font-medium">{selectedLog.filename}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Analysis Date</p>
                      <p className="font-medium font-mono">
                        {new Date(selectedLog.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">IP Address</p>
                      <p className="font-medium font-mono">{selectedLog.ip_address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Severity Level</p>
                      <p className={`font-medium ${getSeverityColor(selectedLog.severity)}`}>
                        {selectedLog.severity}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Attack Type</p>
                    <p className="font-medium">{selectedLog.attack_type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Confidence Score</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-primary"
                          style={{ width: `${(selectedLog.confidence * 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">
                        {(selectedLog.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {selectedLog.details && (
                    <div>
                      <p className="text-sm text-muted-foreground">Analysis Details</p>
                      <div className="bg-muted p-4 rounded font-mono text-sm">
                        {selectedLog.details}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-4">
                    <Button
                      onClick={() => setShowDetails(false)}
                      className="cyber-button flex-1"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setShowDetails(false);
                        onNavigate('dashboard');
                      }}
                      className="cyber-button flex-1"
                    >
                      View Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

