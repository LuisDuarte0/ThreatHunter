import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ analysisData }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [analysisData]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        return;
      }

      const response = await fetch('http://localhost:8000/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setDashboardData(data);
      } else {
        setError(data.detail || 'Failed to load dashboard data');
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#00ff9f', '#f800ff', '#ff6b35', '#4ecdc4', '#45b7d1'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded shadow-lg">
          <p className="text-foreground">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-accent';
      case 'low': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="cyber-card text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button onClick={fetchDashboardData} className="cyber-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="glitch text-3xl font-bold mb-4" data-text="DASHBOARD">
          DASHBOARD
        </h1>
        <p className="text-muted-foreground">
          Real-time threat analysis and security monitoring
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {dashboardData?.total_logs || 0}
          </div>
          <div className="text-sm text-muted-foreground">Total Logs Analyzed</div>
        </div>
        
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-destructive mb-2">
            {dashboardData?.severity_distribution?.High || 0}
          </div>
          <div className="text-sm text-muted-foreground">High Severity Threats</div>
        </div>
        
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-accent mb-2">
            {dashboardData?.severity_distribution?.Medium || 0}
          </div>
          <div className="text-sm text-muted-foreground">Medium Severity Threats</div>
        </div>
        
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {dashboardData?.severity_distribution?.Low || 0}
          </div>
          <div className="text-sm text-muted-foreground">Low Severity Threats</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Attack Types Pie Chart */}
        <div className="cyber-card">
          <h2 className="text-xl font-semibold mb-4 text-primary">Attack Types Distribution</h2>
          {dashboardData?.attack_types?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.attack_types}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.attack_types.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No attack data available
            </div>
          )}
        </div>

        {/* Top IPs Bar Chart */}
        <div className="cyber-card">
          <h2 className="text-xl font-semibold mb-4 text-primary">Top Source IPs</h2>
          {dashboardData?.top_ips?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.top_ips}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#a0a0a0', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#a0a0a0' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#00ff9f" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No IP data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Logs */}
      <div className="cyber-card">
        <h2 className="text-xl font-semibold mb-4 text-primary">Recent Log Analysis</h2>
        {dashboardData?.recent_logs?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground">Timestamp</th>
                  <th className="text-left p-3 text-muted-foreground">File</th>
                  <th className="text-left p-3 text-muted-foreground">IP Address</th>
                  <th className="text-left p-3 text-muted-foreground">Attack Type</th>
                  <th className="text-left p-3 text-muted-foreground">Severity</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recent_logs.map((log, index) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="p-3 text-sm font-mono">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm">{log.filename}</td>
                    <td className="p-3 text-sm font-mono">{log.ip_address}</td>
                    <td className="p-3 text-sm">
                      <span className="px-2 py-1 rounded text-xs bg-accent/20 text-accent border border-accent/30">
                        {log.attack_type}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <span className={`font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No recent logs available. Upload some log files to see analysis results.
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button onClick={fetchDashboardData} className="cyber-button neon-glow">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

