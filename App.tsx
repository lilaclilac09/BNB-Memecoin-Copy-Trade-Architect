
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ConfigManager from './components/ConfigManager';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [bnbPrice, setBnbPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchBnbPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
        const data = await res.json();
        if (data.binancecoin?.usd) {
          setBnbPrice(data.binancecoin.usd);
        }
      } catch (err) {
        console.error("Failed to fetch BNB price", err);
      }
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard />;
      case AppTab.CONFIG:
        return <ConfigManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 selection:bg-yellow-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
            {activeTab.replace('_', ' ')}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              <span className="text-xs text-zinc-400 font-mono">
                BNB: {bnbPrice ? `$${bnbPrice.toLocaleString()}` : 'Loading...'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
              <span className="text-xs text-zinc-400 font-mono">Simulation only</span>
            </div>
          </div>
        </header>

        <div className="relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
