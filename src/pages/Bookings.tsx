import React from 'react';
import { Calendar, Plus } from 'lucide-react';

export const Bookings: React.FC = () => {
  const bookings = [
    { id: '1', date: 'Oct 25, 2023', time: '09:00 AM', customer: 'John Doe', vehicle: 'Toyota Camry (ABC-123)', service: 'Logbook Service', status: 'Confirmed' },
    { id: '2', date: 'Oct 25, 2023', time: '11:00 AM', customer: 'Jane Smith', vehicle: 'Honda Civic (XYZ-789)', service: 'Brake Pad Replacement', status: 'Pending' },
    { id: '3', date: 'Oct 26, 2023', time: '08:30 AM', customer: 'Michael Scott', vehicle: 'Ford Explorer (MIC-001)', service: 'Full Inspection', status: 'Confirmed' }
  ];

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Bookings & Diary</h1>
        <button className="btn btn-primary">
          <Plus size={16} /> New Booking
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td><div className="flex items-center gap-2"><Calendar size={14} className="text-muted"/> {b.date}</div></td>
                  <td className="font-medium">{b.time}</td>
                  <td>{b.customer}</td>
                  <td>{b.vehicle}</td>
                  <td>{b.service}</td>
                  <td><span className={`badge ${b.status === 'Confirmed' ? 'confirmed' : 'pending'}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
