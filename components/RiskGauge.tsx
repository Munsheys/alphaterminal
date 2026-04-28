import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const RiskGauge = ({ probability }: { probability: number }) => {
  const getColor = (p: number) => {
    if (p < 5) return '#66FCF1'; // Safe
    if (p < 20) return '#F1C40F'; // Warning
    return '#E74C3C'; // Danger
  };

  const color = getColor(probability);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg glass-morphism h-full flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">
        <ShieldAlert size={14} />
        <span>Risk of Ruin Engine</span>
      </div>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-zinc-800"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - probability / 100)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(231,76,60,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono text-zinc-100">{probability.toFixed(1)}%</span>
          <span className="text-[10px] text-zinc-500 font-mono uppercase mt-1">Probability</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-zinc-400 font-mono leading-relaxed">
          {probability > 10 
            ? "CRITICAL: High risk of account blow-up detected. Reduce position sizing immediately." 
            : "SAFE: Your current risk parameters suggest high mathematical survivability."}
        </p>
      </div>
    </div>
  );
};
