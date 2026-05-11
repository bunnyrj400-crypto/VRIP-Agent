import React from 'react';
import { Database, Search, Filter, MoreHorizontal } from 'lucide-react';

export const VendorRegistry = () => {
  const vendors = [
    { id: 'V-101', name: 'CyberStream-001', category: 'Cloud Infrastructure', tier: 'Tier 1', status: 'Active', risk: 'Low' },
    { id: 'V-102', name: 'Apex-Financial-Systems', category: 'Payment Gateway', tier: 'Tier 1', status: 'Under Review', risk: 'Moderate' },
    { id: 'V-103', name: 'Global-Tech-Partners', category: 'Consulting', tier: 'Tier 3', status: 'Active', risk: 'Low' },
    { id: 'V-104', name: 'Solaris Networks', category: 'Networking Hardware', tier: 'Tier 2', status: 'Suspended', risk: 'High' },
    { id: 'V-105', name: 'DataVault Solutions', category: 'Data Storage', tier: 'Tier 1', status: 'Active', risk: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold outfit">Vendor Master Registry</h3>
          <p className="text-sm text-gray-500 mt-1">Centralized intelligence for 142 active relationships.</p>
        </div>
        <button className="btn-premium py-2 px-4 text-sm">Add New Vendor</button>
      </div>

      <div className="card p-4 flex justify-between items-center bg-white/5 border border-white/5">
        <div className="flex items-center gap-4 w-2/3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by vendor name, ID, or category..." 
              className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-white"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-black/30 px-4 py-2 rounded-lg border border-gray-700">
            <Filter w-4 h-4 /> Filter
          </button>
        </div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Showing 5 of 142
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase text-gray-500">
                <th className="pb-3 px-4 font-bold tracking-wider">Vendor ID</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Entity Name</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Category</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Tier</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Status</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Risk Level</th>
                <th className="pb-3 px-4 font-bold tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(v => (
                <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 font-medium text-xs text-indigo-400">{v.id}</td>
                  <td className="py-4 px-4 font-medium text-sm text-gray-200">{v.name}</td>
                  <td className="py-4 px-4 text-xs text-gray-400">{v.category}</td>
                  <td className="py-4 px-4 text-xs text-gray-400">{v.tier}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${
                      v.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      v.status === 'Suspended' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        v.risk === 'Low' ? 'bg-emerald-500' : v.risk === 'Moderate' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span className="text-xs text-gray-300">{v.risk}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
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
