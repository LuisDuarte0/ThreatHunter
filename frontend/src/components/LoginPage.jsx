import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';

const LoginPage = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Salvar token no localStorage
          localStorage.setItem('token', data.access_token);
          onNavigate('dashboard');
        } else {
          // Após registro, fazer login automaticamente
          setIsLogin(true);
          setError('Registration successful! Please login.');
        }
      } else {
        setError(data.detail || 'An error occurred');
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="cyber-card w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            className="glitch text-3xl font-bold mb-2"
            data-text="THREAT HUNTER"
          >
            THREAT HUNTER
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Access the cybersecurity platform' : 'Join the threat hunting community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="cyber-input w-full"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="cyber-input w-full"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded bg-destructive/10 border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="cyber-button w-full neon-glow"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '' });
            }}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Register here" 
              : "Already have an account? Login here"
            }
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Secure • Encrypted • Professional</p>
          <div className="flex justify-center space-x-4 mt-2">
            <span className="text-primary">🔒</span>
            <span className="text-accent">🛡️</span>
            <span className="text-primary">⚡</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

