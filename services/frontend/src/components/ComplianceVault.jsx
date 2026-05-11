import React from 'react';
import { ShieldCheck, FileText, Download, CheckCircle, XCircle } from 'lucide-react';

export const ComplianceVault = () => {
  const documents = [
    { id: 'DOC-901', vendor: 'Apex-Financial-Systems', type: 'SOC 2 Type II', status: 'Valid', expiry: '2024-11-30', file: 'soc2_report_2023.pdf' },
    { id: 'DOC-902', vendor: 'Global-Tech-Partners', type: 'ISO 27001', status: 'Expired', expiry: '2023-10-15', file: 'iso_cert_final.pdf' },
    { id: 'DOC-903', vendor: 'CyberStream-001', type: 'GDPR DPA', status: 'Valid', expiry: '2025-01-20', file: 'dpa_signed.pdf' },
    { id: 'DOC-904', vendor: 'Solaris Networks', type: 'PCI DSS', status: 'Pending Review', expiry: '2024-05-10', file: 'pci_dss_v4.pdf' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold outfit">Compliance Vault</h3>
          <p className="text-sm text-gray-500 mt-1">Secure repository for vendor compliance documentation.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card bg-emerald-500/5 border-emerald-500/20 flex flex-col items-center justify-center p-6">
          <ShieldCheck className="text-emerald-500 w-8 h-8 mb-2" />
          <div className="text-3xl font-bold outfit">84%</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Overall Compliance</div>
        </div>
        <div className="card bg-white/5 flex flex-col items-center justify-center p-6 border-white/5">
          <FileText className="text-indigo-400 w-8 h-8 mb-2" />
          <div className="text-3xl font-bold outfit">1,402</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Stored Documents</div>
        </div>
        <div className="card bg-amber-500/5 border-amber-500/20 flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold outfit text-amber-500">12</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pending Review</div>
        </div>
        <div className="card bg-red-500/5 border-red-500/20 flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold outfit text-red-500">3</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Expired Certs</div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-bold text-text-dim uppercase tracking-widest mb-4 flex items-center gap-2">
          <FileText size={16} /> Recent Compliance Documents
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase text-gray-500">
                <th className="pb-3 px-4 font-bold tracking-wider">Document ID</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Vendor</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Type</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Status</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Expiry Date</th>
                <th className="pb-3 px-4 font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(d => (
                <tr key={d.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-medium text-xs text-indigo-400">{d.id}</td>
                  <td className="py-4 px-4 font-medium text-sm text-gray-200">{d.vendor}</td>
                  <td className="py-4 px-4 text-xs font-bold text-gray-300">{d.type}</td>
                  <td className="py-4 px-4">
                    <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${
                      d.status === 'Valid' ? 'text-emerald-500' : 
                      d.status === 'Expired' ? 'text-red-500' : 
                      'text-amber-500'
                    }`}>
                      {d.status === 'Valid' ? <CheckCircle size={12} /> : 
                       d.status === 'Expired' ? <XCircle size={12} /> : 
                       <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-400">{d.expiry}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-gray-400 hover:text-white transition-colors bg-black/30 p-2 rounded-lg border border-gray-700 inline-flex items-center gap-2 text-xs font-medium">
                      <Download size={14} /> Download
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
