import React from 'react';
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import './Topbar.css';

interface TopbarProps {
  toggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { userRole } = useStore();

  const getUserDetails = () => {
    switch(userRole) {
      case 'Mechanic': return { name: 'Mike Rossi', initials: 'MR' };
      case 'Service Advisor': return { name: 'Sarah Lee', initials: 'SL' };
      case 'Accountant': return { name: 'Angela Martin', initials: 'AM' };
      default: return { name: 'John Doe', initials: 'JD' };
    }
  };

  const { name, initials } = getUserDetails();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search jobs, customers, vehicles..." />
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn notification-btn" onClick={() => alert('You have no new notifications.')}>
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <div className="avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{name}</span>
            <span className="user-role">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
