import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Wrench, 
  Users, 
  Car, 
  FileText, 
  Calculator, 
  Package, 
  Bell, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import './Sidebar.css';

import { useStore } from '../store/useStore';

interface SidebarProps {
  collapsed: boolean;
}

const allNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CalendarDays, label: 'Bookings', path: '/bookings' },
  { icon: Wrench, label: 'Jobs', path: '/jobs' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Car, label: 'Vehicles', path: '/vehicles' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: Calculator, label: 'Quotes', path: '/quotes' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: Bell, label: 'Reminders', path: '/reminders' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { userRole } = useStore();
  
  const navItems = userRole === 'Mechanic' 
    ? allNavItems.filter(item => ['Dashboard', 'Jobs', 'Vehicles', 'Inventory'].includes(item.label))
    : allNavItems;

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-box">
          <div className="logo-icon">R</div>
          {!collapsed && <span className="logo-text">RedDot</span>}
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="nav-icon" />
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
