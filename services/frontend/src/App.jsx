import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Activity, 
  Database, 
  Settings, 
  LogOut,
  Search,
  Zap,
  ShieldCheck,
  Fingerprint,
  Briefcase,
  UploadCloud,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ThreatMonitor } from './components/ThreatMonitor';
import { VendorRegistry } from './components/VendorRegistry';
import { ComplianceVault } from './components/ComplianceVault';
import { SystemConfig } from './components/SystemConfig';

const App = () => {
  const [activeTab, setActiveTab] = useState('Command Center');
  
  // Investigation State
  const [vendorId, setVendorId] = useState('CyberStream-001');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [trace, setTrace] = useState([]);

  // Data Ingestion State
  const [uploadStatus, setUploadStatus] = useState('idle');

  const triggerAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTrace([
      { id: 1, agent: 'Planning Node', msg: 'Decomposing strategic objectives...', time: 'Now' },
      { id: 2, agent: 'Intelligence Node', msg: 'Aggregating global threat feeds...', time: 'In Progress' }
    ]);

    try {
      const response = await axios.post('/api/analyze', { vendor_id: vendorId });
      
      setTrace([
        { id: 1, agent: 'Planning Node', msg: 'Strategy finalized.', time: '0.2s' },
        { id: 2, agent: 'Intelligence Node', msg: 'Global feeds ingested.', time: '1.4s' },
        { id: 3, agent: 'Epistemic Engine', msg: 'Probabilistic risk modeling complete.', time: '3.1s' },
        { id: 4, agent: 'Critic Node', msg: 'Inference verified. Generating brief...', time: '4.2s' }
      ]);
      
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Critical Error', error);
      setTrace(prev => [...prev, { id: 5, agent: 'System Node', msg: 'Error connecting to intelligence gateway.', time: 'Failed' }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const simulateDataUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }, 2000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Command Center':
        return (
          <>
            {/* Executive Overview Row */}
            {!analysisResult && !isAnalyzing && (
              <div className="grid grid-cols-3 gap-6 mb-10">
                <StatCard label="Global Risk Score" val="24" sub="Good" color="var(--risk-low)" icon={<Zap size={16}/>} />
                <StatCard label="Monitored Vendors" val="142" sub="+12 this month" color="var(--accent)" icon={<Activity size={16}/>} />
                <StatCard label="Critical Alerts" val="0" sub="All clear" color="var(--risk-low)" icon={<ShieldAlert size={16}/>} />
              </div>
            )}

            <div className="grid grid-cols-12 gap-8">
              {/* Investigation Input */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <section className="card">
                  <h3 className="text-sm font-bold text-text-dim uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Search size={16} /> Initiative Analysis
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Vendor Identifier</label>
                      <input 
                        className="input-field"
                        value={vendorId}
                        onChange={(e) => setVendorId(e.target.value)}
                        placeholder="e.g. MSFT-2024"
                      />
                    </div>
                    <button 
                      className="btn-premium w-full"
                      onClick={triggerAnalysis}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Orchestrating Agents...' : 'Execute Full Analysis'}
                    </button>
                  </div>
                </section>

                {/* Agent Log */}
                <section className="card flex-grow overflow-hidden relative">
                  <div className={isAnalyzing ? 'shimmer absolute inset-0 pointer-events-none' : ''} />
                  <h3 className="text-sm font-bold text-text-dim uppercase tracking-widest mb-6">Autonomous Processing</h3>
                  <div className="space-y-4">
                    {trace.map((step) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={step.id} 
                        className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <Fingerprint size={14} className="text-indigo-400" />
                          <span className="font-medium">{step.agent}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">{step.time}</span>
                      </motion.div>
                    ))}
                    {trace.length === 0 && <p className="text-xs text-gray-600 text-center py-4">Awaiting launch...</p>}
                  </div>
                </section>
              </div>

              {/* Results Display */}
              <div className="col-span-12 lg:col-span-8">
                <AnimatePresence mode="wait">
                  {analysisResult ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {/* Executive Briefing Card */}
                      <div className="card executive-summary p-8">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h3 className="text-2xl font-bold outfit">Executive Intelligence Brief</h3>
                            <p className="text-text-dim text-sm mt-1">Vendor ID: {analysisResult.vendor_id}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold text-text-dim mb-1 uppercase tracking-tighter">Overall Risk Profile</div>
                            <div className="text-4xl font-black outfit" style={{ 
                              color: analysisResult.risk_scores.security > 80 ? 'var(--risk-low)' : 
                                     analysisResult.risk_scores.security > 50 ? 'var(--risk-med)' : 'var(--risk-high)' 
                            }}>
                              {analysisResult.risk_scores.security > 80 ? 'LOW' : 
                               analysisResult.risk_scores.security > 50 ? 'MODERATE' : 'HIGH'}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Security Posture</div>
                            <div className="text-xl font-bold flex items-center gap-2">
                              {analysisResult.risk_scores.security}% <ShieldCheck className="text-emerald-500" size={18} />
                            </div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Operational Impact</div>
                            <div className="text-xl font-bold flex items-center gap-2">
                              MINIMAL <Zap className="text-amber-500" size={18} />
                            </div>
                          </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                          {formatText(analysisResult.summary[0])}
                        </div>
                      </div>

                      {/* Strategic Action Items */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="card p-6 bg-emerald-500/5 border-emerald-500/20">
                          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Key Strengths</h4>
                          <ul className="text-xs space-y-2 text-gray-300">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Verified Data Integrity</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Strong Compliance History</li>
                          </ul>
                        </div>
                        <div className="card p-6 bg-amber-500/5 border-amber-500/20">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Recommended Actions</h4>
                          <ul className="text-xs space-y-2 text-gray-300">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full"/> Schedule Q3 Review</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full"/> Verify SOC2 Renewal</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex items-center justify-center card bg-black/20 border-dashed border-2">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                          <Zap size={32} className="text-gray-700" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-500">System Ready for Deployment</h3>
                        <p className="text-sm text-gray-600 mt-1 max-w-[280px]">Autonomous intelligence nodes are active and awaiting mission parameters.</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        );
      
      case 'Data Ingestion':
        return (
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold outfit mb-2">Manual Data Ingestion</h3>
            <p className="text-text-dim mb-8">Upload internal compliance documents to seed the Qdrant Vector Memory.</p>
            
            <div className="card">
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors cursor-pointer bg-white/5">
                <UploadCloud size={48} className="text-indigo-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Drag & Drop Intelligence Files</h4>
                <p className="text-sm text-gray-500 mb-6">Supports PDF, DOCX, TXT, and JSON. Max 50MB per file.</p>
                <button 
                  className="btn-premium"
                  onClick={simulateDataUpload}
                  disabled={uploadStatus === 'uploading'}
                >
                  {uploadStatus === 'uploading' ? 'Vectorizing Data...' : uploadStatus === 'success' ? 'Ingestion Complete!' : 'Select Files'}
                </button>
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-bold text-text-dim uppercase tracking-widest mb-4">Recent Ingestions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-400" size={18} />
                      <span className="text-sm font-medium">vendor_master_list_2024.csv</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">Indexed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-400" size={18} />
                      <span className="text-sm font-medium">soc2_compliance_guidelines.pdf</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">Indexed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'Threat Monitor': return <ThreatMonitor />;
      case 'Vendor Registry': return <VendorRegistry />;
      case 'Compliance Vault': return <ComplianceVault />;
      case 'System Config': return <SystemConfig />;
      default: return null;
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR: Strategic Controls */}
      <aside className="sidebar">
        <div className="brand flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold outfit tracking-tight">VRIP <span className="text-indigo-500">OS</span></h1>
        </div>

        <nav className="flex flex-col gap-2 mt-8">
          <NavItem icon={<LayoutDashboard size={20} />} label="Command Center" active={activeTab === 'Command Center'} onClick={() => setActiveTab('Command Center')} />
          <NavItem icon={<ShieldAlert size={20} />} label="Threat Monitor" active={activeTab === 'Threat Monitor'} onClick={() => setActiveTab('Threat Monitor')} />
          <NavItem icon={<Database size={20} />} label="Vendor Registry" active={activeTab === 'Vendor Registry'} onClick={() => setActiveTab('Vendor Registry')} />
          <NavItem icon={<UploadCloud size={20} />} label="Data Ingestion" active={activeTab === 'Data Ingestion'} onClick={() => setActiveTab('Data Ingestion')} />
          <NavItem icon={<Briefcase size={20} />} label="Compliance Vault" active={activeTab === 'Compliance Vault'} onClick={() => setActiveTab('Compliance Vault')} />
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <NavItem icon={<Settings size={20} />} label="System Config" active={activeTab === 'System Config'} onClick={() => setActiveTab('System Config')} />
          <NavItem icon={<LogOut size={20} />} label="Exit Terminal" onClick={() => console.log('Exit')} />
        </div>
      </aside>

      {/* MAIN: Executive Intelligence */}
      <main className="main-content">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold outfit">{activeTab}</h2>
            <p className="text-text-dim mt-1">Autonomous Vendor Risk Management System</p>
          </div>
          <div className="flex gap-4">
            <div className="card py-2 px-4 flex items-center gap-3">
              <div className="relative">
                <div className="dot bg-emerald-500" />
                <div className="dot bg-emerald-500 absolute inset-0 pulse" />
              </div>
              <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase">System Nominal</span>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

/* Internal Helper Components */
const formatText = (text) => {
  // Simple markdown parser for bold and newlines
  const formattedLines = text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    
    // Parse bold **text**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="text-gray-300 leading-relaxed text-sm mb-3">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
  return <>{formattedLines}</>;
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'text-text-dim hover:bg-white/5 hover:text-white'}
    `}
  >
    {icon}
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

const StatCard = ({ label, val, sub, color, icon }) => (
  <div className="card flex justify-between items-center">
    <div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <h4 className="text-3xl font-bold outfit">{val}</h4>
        <span className="text-[10px] font-bold mb-2 uppercase" style={{ color }}>{sub}</span>
      </div>
    </div>
    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + '10', color }}>
      {icon}
    </div>
  </div>
);

export default App;
