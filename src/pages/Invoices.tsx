import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Download, Mail, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Invoice, InvoiceStatus } from '../store/useStore';

const generateInvoiceId = () => `INV-${Math.floor(1100 + Math.random() * 900)}`;

export const Invoices: React.FC = () => {
  const { invoices, addInvoice } = useStore();
  const [showModal, setShowModal] = useState(false);
  
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    vehicle: '',
    labourHours: 0,
    labourRate: 120, // default avg hourly rate
    partsCost: 0,
    status: 'Sent' as InvoiceStatus
  });

  const total = (Number(newInvoice.labourHours) * Number(newInvoice.labourRate)) + Number(newInvoice.partsCost);

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInvoice.customer && newInvoice.vehicle) {
      addInvoice({
        id: generateInvoiceId(),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer: newInvoice.customer,
        vehicle: newInvoice.vehicle,
        total: total,
        status: newInvoice.status
      } as Invoice);
      
      setShowModal(false);
      setNewInvoice({ customer: '', vehicle: '', labourHours: 0, labourRate: 120, partsCost: 0, status: 'Sent' });
    }
  };

  const getBadgeClass = (status: string) => {
    switch(status) {
      case 'Paid': return 'completed';
      case 'Sent': return 'pending';
      case 'Overdue': return 'cancelled';
      case 'Voided': return 'cancelled';
      case 'Draft': return 'pending';
      default: return 'pending';
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        inv.customer.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'All') return matchSearch;
    return matchSearch && inv.status === activeTab;
  });

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Invoices & Billing</h1>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download size={16} /> Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      <div className="card flex-col gap-4">
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div className="flex gap-2">
            {['All', 'Draft', 'Unpaid', 'Paid', 'Overdue'].map(tab => (
              <button 
                key={tab}
                className={activeTab === tab ? "btn btn-secondary" : "btn btn-ghost"} 
                style={activeTab === tab ? { backgroundColor: 'var(--bg-primary)' } : {}}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? 'All Invoices' : tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="search-bar" style={{ width: '280px' }}>
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by invoice#, customer..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <button className="btn btn-secondary">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Invoice#</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Total (AUD)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
               {filteredInvoices.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '32px' }}>No invoices found.</td></tr>
               ) : filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td><input type="checkbox" /></td>
                  <td className="font-medium">{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.customer}</td>
                  <td>{invoice.vehicle}</td>
                  <td className="font-medium">${invoice.total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td><span className={`badge ${getBadgeClass(invoice.status)}`}>{invoice.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn-ghost" title="Resend Email"><Mail size={16} /></button>
                      <button className="btn-ghost" title="More Options"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted mt-4">
          <span>{filteredInvoices.length > 0 ? `Showing 1 to ${filteredInvoices.length} of ${filteredInvoices.length} entries` : 'No entries showing'}</span>
          <div className="flex gap-2">
            <button className="btn btn-secondary" disabled>Previous</button>
            <button className="btn btn-secondary" disabled>Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold">Create Invoice</h2>
            <form onSubmit={handleAddInvoice}>
              <div className="form-group">
                <label>Customer Name</label>
                <input required value={newInvoice.customer} onChange={e => setNewInvoice({...newInvoice, customer: e.target.value})} placeholder="e.g. Michael Scott" />
              </div>
              <div className="form-group">
                <label>Vehicle</label>
                <input required value={newInvoice.vehicle} onChange={e => setNewInvoice({...newInvoice, vehicle: e.target.value})} placeholder="e.g. XY-12-ZA" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Labour Hours</label>
                  <input type="number" step="0.5" min="0" value={newInvoice.labourHours} onChange={e => setNewInvoice({...newInvoice, labourHours: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Hourly Rate ($)</label>
                  <input type="number" min="0" value={newInvoice.labourRate} onChange={e => setNewInvoice({...newInvoice, labourRate: Number(e.target.value)})} />
                </div>
              </div>

              <div className="form-group">
                <label>Parts Total Cost ($)</label>
                <input type="number" min="0" step="0.01" value={newInvoice.partsCost} onChange={e => setNewInvoice({...newInvoice, partsCost: Number(e.target.value)})} />
              </div>

              <div className="flex justify-between items-center bg-secondary p-3 rounded mt-2" style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                 <span className="font-semibold text-lg text-muted">Total Due:</span>
                 <span className="font-bold text-xl" style={{ color: 'var(--status-confirmed)' }}>${total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center mt-4">Generate Invoice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
