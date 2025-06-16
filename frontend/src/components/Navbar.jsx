import React from 'react';

const Navbar = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'upload', label: 'Upload Logs', icon: '📤' },
    { id: 'history', label: 'History', icon: '📚' },
    { id: 'about', label: 'About', icon: 'ℹ️' }
  ];

  return (
    <nav className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 
            className="glitch text-2xl font-bold cursor-pointer"
            data-text="THREAT HUNTER"
            onClick={() => onNavigate('dashboard')}
          >
            THREAT HUNTER
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-primary text-primary-foreground neon-glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onNavigate('login')}
          className="cyber-button-danger"
        >
          Logout
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className="md:hidden mt-4 flex flex-wrap gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded text-sm transition-all duration-300 ${
              currentPage === item.id
                ? 'bg-primary text-primary-foreground neon-glow'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

