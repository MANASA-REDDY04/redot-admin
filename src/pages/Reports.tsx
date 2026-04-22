import React from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Financial Reports</h1>
        <button className="btn btn-secondary">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Monthly Revenue Overlay</h3>
        <div className="flex items-center justify-center p-12 bg-secondary rounded border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderStyle: 'dashed', borderWidth: '2px' }}>
          <div className="flex-col items-center gap-2 text-muted">
            <BarChart3 size={48} className="mx-auto" />
            <p className="mt-2">Revenue chart will be generated here once you have at least 30 days of data.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-6 flex-wrap">
        <div className="card flex-1 min-w-[300px]">
          <h4 className="font-semibold mb-2">Top Performing Mechanics</h4>
          <ul className="flex-col gap-3 mt-4">
            <li className="flex justify-between items-center pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <span>JD - John Doe</span>
              <span className="font-medium">24 Jobs ($8,540)</span>
            </li>
            <li className="flex justify-between items-center pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <span>SM - Sarah Miles</span>
              <span className="font-medium">18 Jobs ($6,210)</span>
            </li>
          </ul>
        </div>
        
        <div className="card flex-1 min-w-[300px]">
          <h4 className="font-semibold mb-2">Popular Services</h4>
          <ul className="flex-col gap-3 mt-4">
            <li className="flex justify-between items-center pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <span>Logbook Service</span>
              <span className="font-medium flex items-center gap-1"><TrendingUp size={14} className="text-[var(--status-completed)]"/> 45%</span>
            </li>
            <li className="flex justify-between items-center pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <span>Brake Pad Replacement</span>
              <span className="font-medium flex items-center gap-1"><TrendingUp size={14} className="text-[var(--status-completed)]"/> 22%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
