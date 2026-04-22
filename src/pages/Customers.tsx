import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Customer } from '../store/useStore';

const generateCustomerId = () => Math.random().toString();

export const Customers: React.FC = () => {
  const { customers, addCustomer } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '', phone: '', email: '', vehicles: 1
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CX';
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomer.name) {
      addCustomer({
        id: generateCustomerId(),
        name: newCustomer.name,
        initials: getInitials(newCustomer.name),
        phone: newCustomer.phone,
        email: newCustomer.email,
        vehicles: newCustomer.vehicles,
        spent: 0,
        lastVisit: 'New Customer',
        tags: []
      } as Customer);
      setShowModal(false);
      setNewCustomer({ name: '', phone: '', email: '', vehicles: 1 });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredCustomers = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.phone?.includes(searchQuery);
    if (activeTab === 'All') return matchSearch;
    return matchSearch && c.tags.includes(activeTab);
  });

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
        <div className="flex gap-3">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      <div className="card flex-col gap-4">
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div className="flex gap-2">
            {['All', 'VIP', 'Fleet'].map(tab => (
              <button 
                key={tab}
                className={activeTab === tab ? "btn btn-secondary" : "btn btn-ghost"} 
                style={activeTab === tab ? { backgroundColor: 'var(--bg-primary)' } : {}}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? 'All Customers' : tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="search-bar" style={{ width: '280px' }}>
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by name, phone, email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
                <th>Name</th>
                <th>Contact</th>
                <th>Vehicles</th>
                <th>Total Spent</th>
                <th>Last Visit</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '32px' }}>No customers found.</td></tr>
              ) : filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar" style={{backgroundColor: customer.tags?.includes('Fleet') ? '#2B5CE6' : 'var(--accent-red)'}}>{customer.initials}</div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex-col gap-1 text-sm">
                      <span className="flex items-center gap-1"><Phone size={12}/> {customer.phone || 'N/A'}</span>
                      <span className="text-muted flex items-center gap-1"><Mail size={12}/> {customer.email || 'N/A'}</span>
                    </div>
                  </td>
                  <td>{customer.vehicles}</td>
                  <td className="font-medium">${customer.spent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td>{customer.lastVisit}</td>
                  <td>
                    {customer.tags.map(tag => (
                      <span key={tag} className={`badge ${tag === 'VIP' ? 'pending' : 'confirmed'}`}>{tag}</span>
                    ))}
                  </td>
                  <td>
                    <button className="btn-ghost"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold">Add Customer</h2>
            <form onSubmit={handleAddCustomer}>
              <div className="form-group">
                <label>Full Name</label>
                <input required value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} placeholder="e.g. Andy Bernard" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} placeholder="e.g. 0423 456 789" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} placeholder="e.g. andy@cornell.edu" />
              </div>
              <div className="form-group">
                <label>Number of Vehicles</label>
                <input type="number" min="1" value={newCustomer.vehicles} onChange={e => setNewCustomer({...newCustomer, vehicles: Number(e.target.value)})} />
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center mt-4">Save Customer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
