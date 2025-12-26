
import React, { useState } from 'react';
import { BotConfig } from '../types';
import { INITIAL_CONFIG } from '../constants';

const ConfigManager: React.FC = () => {
  const [config, setConfig] = useState<BotConfig>(INITIAL_CONFIG);
  const [showKey, setShowKey] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const saveConfig = () => {
    alert('Configuration saved to local context (Simulation Only)');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-key text-yellow-500"></i>
            Missing Environment Secrets
          </h3>
          <p className="text-sm text-zinc-400 mt-1">These values are critical for the bot's operation and are never pre-configured in tutorials.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">BNB RPC URL (QuickNode)</label>
              <input
                type="text"
                name="bnbRpcUrl"
                value={config.bnbRpcUrl}
                onChange={handleInputChange}
                placeholder="https://example.bnb.quiknode.pro/abc..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:border-yellow-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Webhook Security Token</label>
              <input
                type="text"
                name="securityToken"
                value={config.securityToken}
                onChange={handleInputChange}
                placeholder="QN-Web-123-abc..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:border-yellow-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Private Execution Key</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                name="privateKey"
                value={config.privateKey}
                onChange={handleInputChange}
                placeholder="0x..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:border-yellow-500 outline-none transition-colors mono"
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <i className={`fas ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 italic">Never share your private key. Use a dedicated bot wallet with limited funds.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Target "Whale" Wallet Address</label>
            <input
              type="text"
              name="targetWallet"
              value={config.targetWallet}
              onChange={handleInputChange}
              placeholder="0x4262..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:border-yellow-500 outline-none transition-colors mono"
            />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-sliders-h text-yellow-500"></i>
            Trading Parameters
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-zinc-300">Min. Copy Amount</label>
                <span className="text-sm text-yellow-500">{config.minAmount} BNB</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="5"
                step="0.01"
                name="minAmount"
                value={config.minAmount}
                onChange={(e) => setConfig({...config, minAmount: parseFloat(e.target.value)})}
                className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <p className="text-xs text-zinc-500">Filters out tiny "dust" transactions from the target wallet.</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-zinc-300">Max Slippage Tolerance</label>
                <span className="text-sm text-yellow-500">{config.maxSlippage}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                name="maxSlippage"
                value={config.maxSlippage}
                onChange={(e) => setConfig({...config, maxSlippage: parseFloat(e.target.value)})}
                className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <p className="text-xs text-zinc-500">Protection against front-running and high volatility.</p>
          </div>
        </div>
        <div className="p-6 bg-zinc-950/30 border-t border-zinc-800 flex justify-end">
          <button 
            onClick={saveConfig}
            className="px-8 py-2.5 bg-yellow-500 text-zinc-950 font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/10"
          >
            Save Bot Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigManager;
