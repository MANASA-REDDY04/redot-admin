import React from 'react';
import { Bell, Plus } from 'lucide-react';

export const Reminders: React.FC = () => {
  const reminders = [
    { id: '1', customer: 'Jane Smith', vehicle: 'Honda Civic', type: 'Rego Renewal', dueDate: 'Nov 01, 2023', status: 'Sent' },
    { id: '2', customer: 'John Doe', vehicle: 'Toyota Camry', type: '6 Month Service', dueDate: 'Nov 15, 2023', status: 'Pending' },
    { id: '3', customer: 'Michael Scott', vehicle: 'Ford Explorer', type: 'Timing Belt Replacement', dueDate: 'Dec 05, 2023', status: 'Draft' }
  ];

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Service Reminders</h1>
        <button className="btn btn-primary">
          <Plus size={16} /> New Reminder
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Reminder Type</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map(r => (
                <tr key={r.id}>
                  <td className="font-medium"><div className="flex items-center gap-2"><Bell size={14} className="text-muted"/> {r.customer}</div></td>
                  <td>{r.vehicle}</td>
                  <td>{r.type}</td>
                  <td>{r.dueDate}</td>
                  <td>
                    <span className={`badge ${
                      r.status === 'Sent' ? 'completed' : 
                      r.status === 'Pending' ? 'pending' : 'cancelled'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
