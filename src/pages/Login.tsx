import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './Login.css';

export const Login: React.FC = () => {
  const [role, setRole] = useState('Owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setUserRole } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(role);
    // Simulate login
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon-lg">R</div>
          <h1 className="login-title">RedDot Auto Care</h1>
          <p className="login-subtitle">Workshop Management System</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Owner">Owner</option>
              <option value="Service Advisor">Service Advisor</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Accountant">Accountant</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4 login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
