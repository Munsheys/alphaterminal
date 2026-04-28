import React from 'react';
import { Terminal, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const TaxConsole = ({ washSales, tlhSuggestions }: { washSales: any[], tlhSuggestions: any[] }) => {
  return (
    <div className="bg-black border border-zinc-800 p-4 rounded-lg font-mono text-xs overflow-hidden h-full">
      <div className="flex items-center gap-2 mb-4 text-zinc-500 border-b border-zinc-800 pb-2">
        <Terminal size={14} />
        <span className="uppercase tracking-widest">Tax Sovereign Console v1.0.4</span>
      </div>
      
      <div className="space-y-4 overflow-y-auto max-h-[300px] custom-scrollbar">
        {washSales.length > 0 ? (
          <div className="space-y-2">
            <div className="text-red-500 flex items-center gap-2 font-bold italic">
              <AlertTriangle size={14} />
              <span>WASH-SALE VIOLATIONS DETECTED</span>
            </div>
            {washSales.map((ws, i) => (
              <div key={i} className="text-zinc-400 border-l-2 border-red-900 pl-3 py-1">
                <p>[{ws.lossTrade.symbol}] Disallowed loss: ${ws.disallowedLoss.toFixed(2)}</p>
                <p className="text-[10px] text-zinc-600">Replacement found within 30-day window on {ws.replacementTrade.entryDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-emerald-500 flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>NO WASH-SALE VIOLATIONS IN CURRENT DATASET</span>
          </div>
        )}

        {tlhSuggestions.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-900">
            <div className="text-amber-500 font-bold">TAX-LOSS HARVESTING OPPORTUNITIES:</div>
            {tlhSuggestions.map((s, i) => (
              <div key={i} className="text-zinc-500 border-l-2 border-amber-900 pl-3 py-1">
                <p>CLOSE [{s.symbol}] - Unrealized loss: ${Math.abs(s.pnl).toFixed(2)}</p>
                <p className="text-[10px] text-zinc-600">Status: Safe to harvest (No trades in 30+ days)</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-zinc-700 pt-4 animate-pulse">
          _ Awaiting input...
        </div>
      </div>
    </div>
  );
};
