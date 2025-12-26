
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: AppTab.DASHBOARD, label: 'Live Monitor', icon: 'fa-chart-line' },
    { id: AppTab.CONFIG, label: 'Bot Config', icon: 'fa-cog' },
  ];

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-zinc-950 font-bold text-xl">
            B
          </div>
          <span className="font-bold text-lg tracking-tight">BNB Architect</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-zinc-800 text-yellow-500 font-medium border border-zinc-700'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-2 py-3 bg-zinc-800/50 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-zinc-400 font-medium">Node Sync: Mainnet</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
