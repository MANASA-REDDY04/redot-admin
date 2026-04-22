import React, { useState } from 'react';
import { Plus, Search, Clock, X } from 'lucide-react';
import './JobCards.css';
import { useStore } from '../store/useStore';
import type { Job, JobStatus, Invoice } from '../store/useStore';

const generateInvId = () => `INV-${Math.floor(1100 + Math.random() * 9000)}`;
const generateJobId = () => `#JOB-${Math.floor(2000 + Math.random() * 1000)}`;

export const JobCards: React.FC = () => {
  const { jobs, addJob, updateJobStatus, addInvoice, userRole } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    customer: '', vehicle: '', service: '', mechanic: 'UN', status: 'Booked', time: '0h 0m'
  });

  const handleGenerateInvoice = (job: Job) => {
    addInvoice({
      id: generateInvId(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      customer: job.customer,
      vehicle: job.vehicle,
      total: 0,
      status: 'Draft'
    } as Invoice);
    alert(`Draft invoice generated for ${job.customer} (${job.id}).\nPlease navigate to to the Invoices module to review billing.`);
  };

  const columns: { title: string; status: JobStatus }[] = [
    { title: 'Booked', status: 'Booked' },
    { title: 'Checked In', status: 'Checked In' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Awaiting Parts', status: 'Awaiting Parts' },
    { title: 'Completed', status: 'Completed' }
  ];

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.customer && newJob.vehicle && newJob.service) {
      addJob({
        ...newJob,
        id: generateJobId()
      } as Job);
      setShowModal(false);
      setNewJob({ customer: '', vehicle: '', service: '', mechanic: 'UN', status: 'Booked', time: '0h 0m' });
    }
  };

  const getBadgeClass = (status: JobStatus) => {
    switch(status) {
      case 'In Progress': return 'progress';
      case 'Completed': return 'completed';
      case 'Booked': return 'pending';
      case 'Checked In': return 'confirmed';
      case 'Awaiting Parts': return 'pending';
      default: return 'pending';
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(j => 
    j.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="jobs-container relative">
      <div className="page-header">
        <h1 className="page-title">Job Management</h1>
        <div className="quick-actions">
          <div className="search-bar" style={{ width: '250px' }}>
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> New Job Card
          </button>
        </div>
      </div>

      <div className="kanban-board overflow-auto" style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem' }}>
        {columns.map(col => {
          const colJobs = filteredJobs.filter(j => j.status === col.status);
          return (
            <div className="kanban-col min-w-[300px]" key={col.status}>
              <div className="kanban-col-header flex justify-between items-center mb-4">
                <span className="col-title font-semibold">{col.title}</span>
                <span className="col-count bg-[var(--bg-secondary)] px-2 rounded">{colJobs.length}</span>
              </div>
              <div className="kanban-cards flex flex-col gap-3">
                {colJobs.map(job => (
                  <div className={`card job-card ${job.status === 'In Progress' ? 'active-job border border-[var(--active-tab-indicator)]' : ''}`} key={job.id}>
                    <div className="job-card-header flex justify-between mb-2">
                      <span className="job-id font-medium">{job.id}</span>
                      <span className={`badge ${getBadgeClass(job.status)}`}>{job.status}</span>
                    </div>
                    <div className="job-customer text-sm mb-1">{job.customer}</div>
                    <div className="job-vehicle text-sm mb-1 opacity-80">{job.vehicle}</div>
                    <div className="job-service text-sm font-medium mb-3">{job.service}</div>
                    <div className="job-card-footer flex justify-between items-center mt-auto">
                      <div className="avatar-sm w-6 h-6 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-xs">{job.mechanic}</div>
                      <div className="job-time flex items-center gap-1 text-xs opacity-70"><Clock size={12} /> {job.time}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-end gap-2 items-center">
                       {userRole !== 'Mechanic' && job.status === 'Completed' && (
                         <button 
                           className="btn btn-secondary text-xs" 
                           style={{ padding: '4px 8px', height: 'auto', border: '1px solid var(--accent-red)' }}
                           onClick={() => handleGenerateInvoice(job)}
                         >
                           Generate Invoice
                         </button>
                       )}
                       <select 
                          className="bg-transparent text-xs p-1 border rounded opacity-70"
                          value={job.status}
                          onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                       >
                         {columns.map(c => <option key={c.status} value={c.status}>{c.status}</option>)}
                       </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold">New Job Card</h2>
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Customer Name</label>
                <input required value={newJob.customer} onChange={e => setNewJob({...newJob, customer: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label>Vehicle</label>
                <input required value={newJob.vehicle} onChange={e => setNewJob({...newJob, vehicle: e.target.value})} placeholder="e.g. ABC-123 (Civic)" />
              </div>
              <div className="form-group">
                <label>Service</label>
                <input required value={newJob.service} onChange={e => setNewJob({...newJob, service: e.target.value})} placeholder="e.g. Logbook Service" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Mechanic Initials</label>
                  <input value={newJob.mechanic} onChange={e => setNewJob({...newJob, mechanic: e.target.value})} placeholder="e.g. JD" />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={newJob.status} onChange={e => setNewJob({...newJob, status: e.target.value as typeof columns[0]['status']})}>
                    {columns.map(c => <option key={c.status} value={c.status}>{c.status}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center mt-4">Create Job</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
