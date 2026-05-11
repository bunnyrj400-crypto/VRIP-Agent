import React from 'react';
import { Activity, AlertTriangle, ShieldAlert, Globe } from 'lucide-react';

export const ThreatMonitor = () => {
  const threats = [
    { id: 1, vendor: 'Solaris Networks', risk: 'Critical', issue: 'Zero-day vulnerability in gateway router', time: '12 mins ago' },
    { id: 2, vendor: 'Apex-Financial-Systems', risk: 'High', issue: 'Unusual outbound traffic detected', time: '1 hr ago' },
    { id: 3, vendor: 'Global-Tech-Partners', risk: 'Medium', issue: 'Expired SSL certificate on staging server', time: '3 hrs ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold outfit">Live Threat Intelligence</h3>
        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          Monitoring Active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card border-l-4 border-l-red-500">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Critical Incidents</div>
          <div className="text-3xl font-bold flex items-center gap-2">1 <AlertTriangle size={20} className="text-red-500"/></div>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Elevated Risks</div>
          <div className="text-3xl font-bold flex items-center gap-2">4 <Activity size={20} className="text-amber-500"/></div>
        </div>
        <div className="card border-l-4 border-l-indigo-500">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Global Feeds Parsed</div>
          <div className="text-3xl font-bold flex items-center gap-2">12,405 <Globe size={20} className="text-indigo-500"/></div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-bold text-text-dim uppercase tracking-widest mb-4 flex items-center gap-2">
          <ShieldAlert size={16} /> Active Alerts
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase text-gray-500">
                <th className="pb-3 px-4 font-bold tracking-wider">Vendor</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Risk Level</th>
                <th className="pb-3 px-4 font-bold tracking-wider">Issue Description</th>
                <th className="pb-3 px-4 font-bold tracking-wider text-right">Detected</th>
              </tr>
            </thead>
            <tbody>
              {threats.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-medium text-sm text-gray-300">{t.vendor}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${
                      t.risk === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      t.risk === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {t.risk}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">{t.issue}</td>
                  <td className="py-4 px-4 text-xs text-gray-500 text-right">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
