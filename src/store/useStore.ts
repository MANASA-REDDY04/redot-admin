import { create } from 'zustand';

export type JobStatus = 'Booked' | 'Checked In' | 'In Progress' | 'Awaiting Parts' | 'Completed';
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Voided';

export interface Job {
  id: string;
  customer: string;
  vehicle: string;
  service: string;
  mechanic: string;
  status: JobStatus;
  time: string;
}

export interface Customer {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  vehicles: number;
  spent: number;
  lastVisit: string;
  tags: string[];
}

export interface InventoryItem {
  partNo: string;
  desc: string;
  category: string;
  stock: number;
  min: number;
  cost: number;
  sell: number;
  markup: number;
}

export interface Invoice {
  id: string;
  date: string;
  customer: string;
  vehicle: string;
  total: number;
  status: InvoiceStatus;
}

interface StoreState {
  userRole: string;
  setUserRole: (role: string) => void;
  jobs: Job[];
  customers: Customer[];
  inventory: InventoryItem[];
  invoices: Invoice[];
  addJob: (job: Job) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  addCustomer: (customer: Customer) => void;
  addInventory: (item: InventoryItem) => void;
  addInvoice: (invoice: Invoice) => void;
}

export const useStore = create<StoreState>((set) => ({
  userRole: 'Owner',
  setUserRole: (role) => set({ userRole: role }),
  jobs: [
    { id: '#JOB-2041', customer: 'Michael Scott', vehicle: 'XY-12-ZA (Camry)', service: 'Logbook Service', mechanic: 'TG', status: 'In Progress', time: '2h 15m' },
    { id: '#JOB-2042', customer: 'Jim Halpert', vehicle: 'ABC-123 (Hilux)', service: 'Brake Pad Replacement', mechanic: 'MR', status: 'Awaiting Parts', time: 'Paused' },
    { id: '#JOB-2043', customer: 'Pam Beesly', vehicle: 'XYZ-890 (Corolla)', service: 'Pink Slip (eSafety)', mechanic: 'TG', status: 'Completed', time: '45m' },
    { id: '#JOB-2044', customer: 'Dwight Schrute', vehicle: 'BEET-1 (Trans Am)', service: 'Major Service', mechanic: 'JD', status: 'Checked In', time: '0h 0m' },
    { id: '#JOB-2045', customer: 'Kevin Malone', vehicle: 'ABC-123 (Civic)', service: 'Brake Pad Replacement', mechanic: 'UN', status: 'Booked', time: '0h 0m' },
    { id: '#JOB-2046', customer: 'Oscar Martinez', vehicle: 'XYZ-987 (Prius)', service: 'Logbook Service', mechanic: 'UN', status: 'Booked', time: '0h 0m' },
  ],
  customers: [
    { id: '1', name: 'Michael Scott', initials: 'MS', phone: '0412 345 678', email: 'mscott@dundermifflin.com', vehicles: 2, spent: 4250, lastVisit: '21 Oct 2026', tags: ['VIP'] },
    { id: '2', name: 'Dwight Schrute', initials: 'DS', phone: '0498 765 432', email: 'dschrute@schrutefarms.com', vehicles: 3, spent: 1850, lastVisit: '15 Oct 2026', tags: ['Fleet'] },
  ],
  inventory: [
    { partNo: 'BP-R-001', desc: 'Bendix General CT Rear Brake Pads', category: 'Brakes', stock: 2, min: 5, cost: 45, sell: 85, markup: 88 },
    { partNo: 'OF-Z-154', desc: 'Ryco Z154 Oil Filter', category: 'Filters', stock: 12, min: 10, cost: 8.5, sell: 18, markup: 111 },
    { partNo: 'SP-I-BKR6', desc: 'NGK BKR6E-11 Spark Plug', category: 'Ignition', stock: 48, min: 20, cost: 4.2, sell: 8.5, markup: 102 },
  ],
  invoices: [
    { id: 'INV-1095', date: '21 Oct 2026', customer: 'Stanley Hudson', vehicle: 'XY-12-ZA', total: 450, status: 'Sent' },
    { id: 'INV-1094', date: '20 Oct 2026', customer: 'Phyllis Vance', vehicle: 'ABC-123', total: 820, status: 'Paid' },
    { id: 'INV-1093', date: '15 Oct 2026', customer: 'Angela Martin', vehicle: 'XYZ-890', total: 1200, status: 'Overdue' },
    { id: 'INV-1092', date: '14 Oct 2026', customer: 'Toby Flenderson', vehicle: 'TOBY-1', total: 320, status: 'Voided' },
  ],
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJobStatus: (id, status) => set((state) => ({
    jobs: state.jobs.map(j => j.id === id ? { ...j, status } : j)
  })),
  addCustomer: (customer) => set((state) => ({ customers: [customer, ...state.customers] })),
  addInventory: (item) => set((state) => ({ inventory: [item, ...state.inventory] })),
  addInvoice: (invoice) => set((state) => ({ invoices: [invoice, ...state.invoices] })),
}));
