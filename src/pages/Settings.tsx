import React from 'react';
import { Save } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="flex-col gap-6 h-full relative" style={{ maxWidth: '800px' }}>
      <div className="page-header">
        <h1 className="page-title">Workshop Settings</h1>
        <button className="btn btn-primary">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4 text-lg border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>General Information</h3>
        <form className="flex-col gap-4 mt-4">
          <div className="form-group">
            <label>Workshop Name</label>
            <input type="text" defaultValue="RedDot Auto Care" />
          </div>
          <div className="form-row">
            <div className="form-group flex-1">
              <label>ABN / Business Number</label>
              <input type="text" defaultValue="12 345 678 901" />
            </div>
            <div className="form-group flex-1">
              <label>Default Hourly Rate ($)</label>
              <input type="number" defaultValue="120" />
            </div>
          </div>
          <div className="form-group">
            <label>Business Address</label>
            <input type="text" defaultValue="123 Mechanic Lane, Auto City, AC 4567" />
          </div>
        </form>
      </div>

      <div className="card mt-6">
        <h3 className="font-semibold mb-4 text-lg border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>Integrations</h3>
        <div className="flex-col gap-4 mt-4">
          <div className="flex justify-between items-center p-3 rounded bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="flex-col gap-1">
              <span className="font-medium">Stripe Payment Gateway</span>
              <span className="text-sm text-muted">Currently using mocked payment mode</span>
            </div>
            <button className="btn btn-secondary">Connect Stripe</button>
          </div>
          <div className="flex justify-between items-center p-3 rounded bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="flex-col gap-1">
              <span className="font-medium">Xero Accounting</span>
              <span className="text-sm text-muted">Not connected</span>
            </div>
            <button className="btn btn-secondary">Connect Xero</button>
          </div>
          <div className="flex justify-between items-center p-3 rounded bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="flex-col gap-1">
              <span className="font-medium">Burson EzyParts</span>
              <span className="text-sm text-muted">Connected for inventory sync</span>
            </div>
            <span className="badge confirmed">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
