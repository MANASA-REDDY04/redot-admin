import React from 'react';
import { 
  DollarSign, 
  Wrench, 
  Calendar, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus
} from 'lucide-react';
import './Dashboard.css';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { jobs, invoices } = useStore();
  const navigate = useNavigate();

  const activeJobsCount = jobs.filter(j => ['In Progress', 'Checked In'].includes(j.status)).length;
  const pendingJobsCount = jobs.filter(j => j.status === 'Booked').length;
  const overdueInvoicesCount = invoices.filter(i => i.status === 'Overdue').length;
  const todaysRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0);

  const getJobBadgeClass = (status: string) => {
    switch(status) {
      case 'In Progress': return 'progress';
      case 'Completed': return 'completed';
      case 'Booked': return 'pending';
      case 'Checked In': return 'confirmed';
      case 'Awaiting Parts': return 'pending';
      default: return 'pending';
    }
  };

  const getInvoiceBadgeClass = (status: string) => {
    switch(status) {
      case 'Paid': return 'completed';
      case 'Sent': return 'pending';
      case 'Overdue': return 'cancelled';
      case 'Voided': return 'cancelled';
      default: return 'pending';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <div className="quick-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/bookings')}>
            <Plus size={16} /> New Booking
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/jobs')}>
            <Plus size={16} /> New Job Card
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/invoices')}>
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Today's Revenue</span>
            <div className="kpi-icon revenue"><DollarSign size={20} /></div>
          </div>
          <div className="kpi-value">${todaysRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <div className="kpi-trend positive">
            <ArrowUpRight size={16} />
            <span>+12% from yesterday</span>
          </div>
        </div>
        
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Active Jobs</span>
            <div className="kpi-icon jobs"><Wrench size={20} /></div>
          </div>
          <div className="kpi-value">{activeJobsCount}</div>
          <div className="kpi-trend positive">
            <ArrowUpRight size={16} />
            <span>+2 from yesterday</span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Pending Bookings</span>
            <div className="kpi-icon bookings"><Calendar size={20} /></div>
          </div>
          <div className="kpi-value">{pendingJobsCount}</div>
          <div className="kpi-trend negative">
            <ArrowDownRight size={16} />
            <span>-3 from yesterday</span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Overdue Invoices</span>
            <div className="kpi-icon alerts"><AlertCircle size={20} /></div>
          </div>
          <div className="kpi-value">{overdueInvoicesCount}</div>
          <div className="kpi-trend negative">
            <ArrowUpRight size={16} />
            <span>+1 from yesterday</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card jobs-table-card">
          <div className="card-header">
            <h2 className="card-title">Jobs in Progress</h2>
            <button className="btn btn-ghost text-sm" onClick={() => navigate('/jobs')}>View All</button>
          </div>
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
                <Wrench size={32} color="var(--text-secondary)" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Active Jobs</h3>
              <p className="text-sm text-muted mb-4">You have no active job cards at the moment.</p>
              <button className="btn btn-primary" onClick={() => navigate('/jobs')}>
                <Plus size={16} /> Create Job Card
              </button>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Job#</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Mechanic</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.slice(0, 4).map(job => (
                    <tr key={job.id}>
                      <td className="font-medium">{job.id}</td>
                      <td>{job.customer}</td>
                      <td>{job.vehicle}</td>
                      <td>{job.service}</td>
                      <td><div className="avatar-sm">{job.mechanic}</div></td>
                      <td><span className={`badge ${getJobBadgeClass(job.status)}`}>{job.status === 'In Progress' ? 'In Progress' : job.status}</span></td>
                      <td>{job.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card invoices-card">
          <div className="card-header">
            <h2 className="card-title">Recent Invoices</h2>
            <button className="btn btn-ghost text-sm" onClick={() => navigate('/invoices')}>View All</button>
          </div>
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
                <DollarSign size={32} color="var(--text-secondary)" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Invoices</h3>
              <p className="text-sm text-muted mb-4">You have not created any invoices yet.</p>
              <button className="btn btn-primary" onClick={() => navigate('/invoices')}>
                <Plus size={16} /> Create Invoice
              </button>
            </div>
          ) : (
            <div className="invoice-list">
              {invoices.slice(0, 3).map(invoice => (
                <div className="invoice-item" key={invoice.id}>
                  <div className="invoice-info">
                    <span className="invoice-number">{invoice.id}</span>
                    <span className="invoice-customer">{invoice.customer}</span>
                  </div>
                  <div className="invoice-meta">
                    <span className="invoice-amount">${invoice.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span className={`badge ${getInvoiceBadgeClass(invoice.status)}`}>{invoice.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
