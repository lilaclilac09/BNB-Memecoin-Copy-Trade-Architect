
import React, { useState } from 'react';
import { getTechnicalAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    const advice = await getTechnicalAdvice(query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col min-h-[600px]">
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Architect Knowledge Base</h3>
            <p className="text-sm text-zinc-400">Powered by Gemini - Ask technical questions about the tutorial implementation.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500">
            <i className="fas fa-brain"></i>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {response ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded bg-yellow-500 flex-shrink-0 flex items-center justify-center text-zinc-950">
                  <i className="fas fa-robot text-sm"></i>
                </div>
                <div className="bg-zinc-800/50 p-6 rounded-2xl rounded-tl-none border border-zinc-700/50 text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
              <i className="fas fa-comments text-4xl opacity-20"></i>
              <p className="text-center max-w-xs italic text-sm">
                Ask about "Viem error handling", "Webhook validation", or "Decoding four.meme events".
              </p>
            </div>
          )}
          {loading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded bg-zinc-800 flex-shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-zinc-950 border-t border-zinc-800">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="How do I implement slippage protection in the buyTokenAMAP call?"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 pr-16 text-sm outline-none focus:border-yellow-500 transition-colors"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-500 text-zinc-950 rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
