import React from 'react';
import { Car, Plus } from 'lucide-react';

export const Vehicles: React.FC = () => {
  const vehicles = [
    { id: 'V1', rego: 'ABC-123', make: 'Toyota', model: 'Camry', year: '2019', customer: 'John Doe', lastService: 'Sep 15, 2023' },
    { id: 'V2', rego: 'XYZ-789', make: 'Honda', model: 'Civic', year: '2021', customer: 'Jane Smith', lastService: 'Oct 10, 2023' },
    { id: 'V3', rego: 'MIC-001', make: 'Ford', model: 'Explorer', year: '2018', customer: 'Michael Scott', lastService: 'Aug 05, 2023' }
  ];

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Vehicles</h1>
        <button className="btn btn-primary">
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Rego (License Plate)</th>
                <th>Make & Model</th>
                <th>Year</th>
                <th>Owner</th>
                <th>Last Service</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v.id}>
                  <td className="font-bold whitespace-nowrap"><div className="flex items-center gap-2"><Car size={16} className="text-muted"/> {v.rego}</div></td>
                  <td>{v.make} {v.model}</td>
                  <td>{v.year}</td>
                  <td>{v.customer}</td>
                  <td>{v.lastService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
