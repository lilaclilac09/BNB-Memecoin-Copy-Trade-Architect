
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketPulse } from '../services/geminiService';

const PERFORMANCE_DATA = [
  { time: '10:00', value: 1.2 },
  { time: '11:00', value: 1.8 },
  { time: '12:00', value: 1.5 },
  { time: '13:00', value: 2.1 },
  { time: '14:00', value: 2.4 },
  { time: '15:00', value: 2.2 },
  { time: '16:00', value: 2.9 },
];

const Dashboard: React.FC = () => {
  const [marketPulse, setMarketPulse] = useState<string>('');
  const [loadingPulse, setLoadingPulse] = useState<boolean>(true);

  useEffect(() => {
    const fetchPulse = async () => {
      setLoadingPulse(true);
      const pulse = await getMarketPulse();
      setMarketPulse(pulse);
      setLoadingPulse(false);
    };
    fetchPulse();
  }, []);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Targets', value: '12', sub: 'Monitoring Whales', icon: 'fa-users' },
          { label: 'Live Network', value: 'BNB Chain', sub: 'Mainnet V3', icon: 'fa-bolt' },
          { label: 'Latency', value: '120ms', sub: 'Optimized via QuickNode', icon: 'fa-tachometer-alt' },
          { label: 'Safety Score', value: '98/100', sub: 'Anti-Rug Enabled', icon: 'fa-shield-alt' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
              <i className={`fas ${stat.icon} text-yellow-500`}></i>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-zinc-100">Network Traffic & Gas Trends</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-800 rounded text-xs text-zinc-300">Live</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                  itemStyle={{ color: '#eab308' }}
                />
                <Area type="monotone" dataKey="value" stroke="#eab308" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-100">BNB Market Pulse</h3>
            <button 
              onClick={async () => {
                setLoadingPulse(true);
                setMarketPulse(await getMarketPulse());
                setLoadingPulse(false);
              }}
              className="text-xs text-zinc-500 hover:text-yellow-500 transition-all active:scale-95"
              title="Refresh Market Pulse"
            >
              <i className={`fas fa-sync-alt ${loadingPulse ? 'animate-spin text-yellow-500' : ''}`}></i>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
            {loadingPulse ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 bg-zinc-800/50 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap font-sans">
                {marketPulse}
              </div>
            )}
          </div>
          <div className="mt-6 p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg">
            <p className="text-[10px] text-zinc-500 italic">
              Real-time trending analysis provided by Google Search grounding via Gemini API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
