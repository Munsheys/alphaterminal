import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const RiskGauge = ({ probability }: { probability: number }) => {
  const getStatus = (p: number) => {
    if (p < 5) return { label: 'SAFE', color: '#10B981', icon: <ShieldCheck size={20} /> };
    if (p < 20) return { label: 'WARNING', color: '#F59E0B', icon: <ShieldAlert size={20} /> };
    return { label: 'CRITICAL', color: '#EF4444', icon: <ShieldAlert size={20} /> };
  };

  const status = getStatus(probability);

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-zinc-800" style={{ color: status.color }}>{status.icon}</div>
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Account Survivability</span>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-4xl font-bold text-white">{status.label}</span>
            <span className="text-xs text-zinc-500 font-mono">{probability.toFixed(1)}% Ruin Prob</span>
          </div>
          
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${Math.min(100, Math.max(5, probability * 2))}%`, 
                backgroundColor: status.color,
                boxShadow: `0 0 20px ${status.color}33`
              }}
            />
          </div>
        </div>
      </div>
      
      <p className="text-sm text-zinc-400 leading-relaxed">
        {probability > 10 
          ? "Your current strategy has a significant mathematical risk of total account failure. We recommend immediate position size reduction." 
          : "Your mathematical risk profile is currently excellent. Your strategy is sustainable at this current equity level."}
      </p>
    </div>
  );
};
