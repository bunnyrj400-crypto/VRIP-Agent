import React from 'react';
import { Settings, Cpu, Database, Server, Key, Bell, Shield, Network } from 'lucide-react';

export const SystemConfig = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold outfit">System Configuration</h3>
          <p className="text-sm text-gray-500 mt-1">Manage global platform settings, agent models, and infrastructure connections.</p>
        </div>
        <button className="btn-premium py-2 px-4 text-sm">Save Configuration</button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Navigation */}
        <div className="col-span-3 space-y-2">
          <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold flex items-center gap-3 text-white cursor-pointer">
            <Cpu size={18} className="text-indigo-400" /> Intelligence Engine
          </div>
          <div className="px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-3 text-gray-400 cursor-pointer transition-colors">
            <Database size={18} /> Data & Vector Stores
          </div>
          <div className="px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-3 text-gray-400 cursor-pointer transition-colors">
            <Network size={18} /> MCP Integration
          </div>
          <div className="px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-3 text-gray-400 cursor-pointer transition-colors">
            <Key size={18} /> API Keys & Auth
          </div>
          <div className="px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-3 text-gray-400 cursor-pointer transition-colors">
            <Bell size={18} /> Alerting Thresholds
          </div>
        </div>

        {/* Right Column - Settings Form */}
        <div className="col-span-9 space-y-6">
          <div className="card">
            <h4 className="text-lg font-bold outfit mb-4 flex items-center gap-2 border-b border-white/5 pb-4">
              <Cpu className="text-indigo-500" size={20} /> Base Models & Orchestration
            </h4>
            
            <div className="space-y-6 pt-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Primary Reasoning Model</label>
                  <select className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 text-white appearance-none cursor-pointer">
                    <option>llama-3.3-70b-versatile</option>
                    <option>mixtral-8x7b-32768</option>
                    <option>gemma-7b-it</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Agent Temperature (Creativity)</label>
                  <input type="range" min="0" max="100" defaultValue="10" className="w-full accent-indigo-500 mt-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Deterministic (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Active Autonomous Nodes</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4" /> Planning Node
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4" /> Intelligence Node
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4" /> Critic Node
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card opacity-50 cursor-not-allowed relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
              <span className="bg-black border border-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                <Shield size={16}/> Enterprise License Required
              </span>
            </div>
            <h4 className="text-lg font-bold outfit mb-4 flex items-center gap-2 border-b border-white/5 pb-4">
              <Server className="text-gray-500" size={20} /> Custom Epistemic Engine Rules
            </h4>
            <div className="space-y-4 pt-2">
              <div className="h-24 bg-white/5 rounded-lg border border-white/5 border-dashed"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
