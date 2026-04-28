import React from 'react';
import { AlertTriangle, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export const TaxConsole = ({ washSales, tlhSuggestions }: { washSales: any[], tlhSuggestions: any[] }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400"><Lightbulb size={20} /></div>
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Tax Sovereign Insights</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
        {washSales.length > 0 ? (
          washSales.map((ws, i) => (
            <div key={i} className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase mb-3">
                <AlertTriangle size={14} />
                <span>Wash-Sale Alert</span>
              </div>
              <p className="text-white font-bold text-lg mb-1">{ws.lossTrade.symbol}</p>
              <p className="text-sm text-zinc-400 mb-4">Disallowed loss: <span className="text-red-400 font-mono">${ws.disallowedLoss.toFixed(2)}</span></p>
              <div className="text-[11px] text-zinc-500 bg-black/40 p-2 rounded border border-zinc-800 font-mono">
                Replacement trade detected on {ws.replacementTrade.entryDate}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-xl flex items-center gap-4">
            <CheckCircle2 className="text-emerald-500" size={24} />
            <div>
              <p className="text-emerald-500 font-bold text-sm uppercase">Compliance Status: CLEAR</p>
              <p className="text-xs text-zinc-500">No wash-sale violations found in your current trade history.</p>
            </div>
          </div>
        )}

        {tlhSuggestions.length > 0 && tlhSuggestions.map((s, i) => (
          <div key={i} className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-xl">
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase mb-3">
              <Lightbulb size={14} />
              <span>Harvest Opportunity</span>
            </div>
            <p className="text-white font-bold text-lg mb-1">Sell {s.symbol}</p>
            <p className="text-sm text-zinc-400 mb-4">Potential tax offset: <span className="text-amber-400 font-mono">${Math.abs(s.pnl).toFixed(2)}</span></p>
            <button className="w-full flex items-center justify-between p-2 rounded bg-amber-500/10 text-amber-500 text-[11px] font-bold hover:bg-amber-500/20 transition-colors">
              <span>VIEW TRADE DETAILS</span>
              <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
