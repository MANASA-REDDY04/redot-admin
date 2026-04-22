import React from 'react';
import { FileText, Plus } from 'lucide-react';

export const Quotes: React.FC = () => {
  const quotes = [
    { id: 'QT-2023-001', customer: 'Andy Bernard', vehicle: 'Nissan X-Trail', total: 450.00, status: 'Sent', date: 'Oct 18, 2023' },
    { id: 'QT-2023-002', customer: 'Pam Beesly', vehicle: 'Toyota Yaris', total: 120.50, status: 'Accepted', date: 'Oct 20, 2023' },
    { id: 'QT-2023-003', customer: 'Jim Halpert', vehicle: 'Subaru Outback', total: 890.00, status: 'Draft', date: 'Oct 22, 2023' }
  ];

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Quotes / Estimates</h1>
        <button className="btn btn-primary">
          <Plus size={16} /> New Quote
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Date Created</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Amount (AUD)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q.id}>
                  <td className="font-medium"><div className="flex items-center gap-2"><FileText size={14} className="text-muted"/> {q.id}</div></td>
                  <td>{q.date}</td>
                  <td>{q.customer}</td>
                  <td>{q.vehicle}</td>
                  <td className="font-medium">${q.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${
                      q.status === 'Accepted' ? 'completed' : 
                      q.status === 'Draft' ? 'pending' : 'progress'
                    }`}>
                      {q.status}
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
