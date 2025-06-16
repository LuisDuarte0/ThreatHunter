import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import Navbar from './components/Navbar.jsx';
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import UploadPage from './components/UploadPage.jsx';
import HistoryPage from './components/HistoryPage.jsx';
import AboutPage from './components/AboutPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [analysisData, setAnalysisData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  // Navigation handler
  const handleNavigate = (page) => {
    if (page === 'login') {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setCurrentPage('login');
      setAnalysisData(null);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        setCurrentPage(page);
      } else {
        setCurrentPage('login');
      }
    }
  };

  // Analysis completion handler
  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  // Analysis selection handler (for history)
  const handleAnalysisSelect = (data) => {
    setAnalysisData(data);
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      
      case 'dashboard':
        return <Dashboard analysisData={analysisData} />;
      
      case 'upload':
        return (
          <UploadPage
            onAnalysisComplete={handleAnalysisComplete}
            onNavigate={handleNavigate}
          />
        );
      
      case 'history':
        return (
          <HistoryPage
            onAnalysisSelect={handleAnalysisSelect}
            onNavigate={handleNavigate}
          />
        );
      
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      
      default:
        return <Dashboard analysisData={analysisData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isAuthenticated && currentPage !== 'login' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}
      
      <main className={isAuthenticated && currentPage !== 'login' ? '' : ''}>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;

