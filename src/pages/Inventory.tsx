import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, ArrowUpDown, AlertCircle, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { InventoryItem } from '../store/useStore';

export const Inventory: React.FC = () => {
  const { inventory, addInventory } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newPart, setNewPart] = useState({
    partNo: '', desc: '', category: 'General', stock: 10, min: 5, cost: 0, markup: 50
  });

  const lowStockItems = inventory.filter(i => i.stock <= i.min);

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPart.partNo && newPart.desc) {
      addInventory({
        partNo: newPart.partNo.toUpperCase(),
        desc: newPart.desc,
        category: newPart.category,
        stock: newPart.stock,
        min: newPart.min,
        cost: newPart.cost,
        markup: newPart.markup,
        sell: Number((newPart.cost * (1 + newPart.markup / 100)).toFixed(2))
      } as InventoryItem);
      setShowModal(false);
      setNewPart({ partNo: '', desc: '', category: 'General', stock: 10, min: 5, cost: 0, markup: 50 });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredInventory = inventory.filter(item => {
    const matchSearch = item.partNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'All') return matchSearch;
    if (activeTab === 'Low Stock') return matchSearch && item.stock <= item.min;
    if (activeTab === 'Ordering') return matchSearch && item.stock <= item.min; // Simplification, can be identical for demo
    return matchSearch;
  });

  return (
    <div className="flex-col gap-6 h-full relative">
      <div className="page-header">
        <h1 className="page-title">Parts Inventory</h1>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            Sync Burson EzyParts
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Add Part
          </button>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="card" style={{ backgroundColor: 'var(--status-pending-bg)', borderColor: 'var(--status-pending)', marginBottom: 'var(--space-2)' }}>
          <div className="flex items-center gap-3">
            <AlertCircle size={20} color="var(--status-pending)" />
            <span className="font-medium text-sm" style={{ color: 'var(--status-pending)' }}>Low Stock Alert: {lowStockItems.length} items have fallen below minimum stock levels.</span>
          </div>
        </div>
      )}

      <div className="card flex-col gap-4">
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div className="flex gap-2">
            {['All', 'Low Stock', 'Ordering'].map(tab => (
              <button 
                key={tab}
                className={activeTab === tab ? "btn btn-secondary" : "btn btn-ghost"} 
                style={activeTab === tab ? { backgroundColor: 'var(--bg-primary)' } : {}}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All' ? 'All Parts' : tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="search-bar" style={{ width: '280px' }}>
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search part#, description, barcode..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
                <th>Part# <ArrowUpDown size={12} className="inline ml-1"/></th>
                <th>Description</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Min</th>
                <th>Cost</th>
                <th>Sell (Markup)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '32px' }}>No inventory parts found.</td></tr>
              ) : filteredInventory.map(item => (
                <tr key={item.partNo}>
                  <td className="font-medium">{item.partNo}</td>
                  <td>{item.desc}</td>
                  <td><span className="badge" style={{backgroundColor: 'var(--bg-primary)'}}>{item.category}</span></td>
                  <td>
                    {item.stock <= item.min ? (
                      <span className="font-medium flex items-center gap-1" style={{ color: 'var(--error-color)' }}>{item.stock} <AlertCircle size={12}/></span>
                    ) : (
                      item.stock
                    )}
                  </td>
                  <td>{item.min}</td>
                  <td>${item.cost.toFixed(2)}</td>
                  <td>${item.sell.toFixed(2)} ({item.markup}%)</td>
                  <td><button className="btn-ghost"><MoreHorizontal size={16} /></button></td>
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
            <h2 className="text-xl font-semibold">Add Inventory Part</h2>
            <form onSubmit={handleAddPart}>
              <div className="form-row">
                <div className="form-group">
                  <label>Part No</label>
                  <input required value={newPart.partNo} onChange={e => setNewPart({...newPart, partNo: e.target.value})} placeholder="e.g. FLT-001" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input required value={newPart.category} onChange={e => setNewPart({...newPart, category: e.target.value})} placeholder="e.g. Filters" />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input required value={newPart.desc} onChange={e => setNewPart({...newPart, desc: e.target.value})} placeholder="e.g. Premium Oil Filter" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cost Price ($)</label>
                  <input type="number" step="0.01" min="0" value={newPart.cost} onChange={e => setNewPart({...newPart, cost: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Markup (%)</label>
                  <input type="number" min="0" value={newPart.markup} onChange={e => setNewPart({...newPart, markup: Number(e.target.value)})} />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Current Stock</label>
                  <input type="number" min="0" value={newPart.stock} onChange={e => setNewPart({...newPart, stock: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Min Level Alert</label>
                  <input type="number" min="0" value={newPart.min} onChange={e => setNewPart({...newPart, min: Number(e.target.value)})} />
                </div>
              </div>

              <div className="p-3 bg-secondary rounded flex justify-between items-center mt-2" style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span className="font-semibold text-muted">Calculated Sell Price:</span>
                <span className="font-bold" style={{ color: 'var(--status-confirmed)' }}>
                  ${(newPart.cost * (1 + newPart.markup / 100)).toFixed(2)}
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center mt-4">Save Part</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
