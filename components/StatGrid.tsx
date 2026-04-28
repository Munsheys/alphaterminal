import React from 'react';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ label, value, icon, color }: StatProps) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg glass-morphism">
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
      <div style={{ color }}>{icon}</div>
    </div>
    <div className="text-2xl font-bold font-mono tracking-tight text-zinc-100">{value}</div>
  </div>
);

export const StatGrid = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Win Rate" 
        value={`${(stats.winRate * 100).toFixed(1)}%`} 
        icon={<Target size={16} />} 
        color="#66FCF1" 
      />
      <StatCard 
        label="Profit Factor" 
        value={stats.profitFactor.toFixed(2)} 
        icon={<TrendingUp size={16} />} 
        color="#F1C40F" 
      />
      <StatCard 
        label="Expected Value" 
        value={`$${stats.expectedValue.toFixed(2)}`} 
        icon={<Zap size={16} />} 
        color="#66FCF1" 
      />
      <StatCard 
        label="Max Drawdown" 
        value={`-$${stats.maxDrawdown.toFixed(2)}`} 
        icon={<TrendingDown size={16} />} 
        color="#E74C3C" 
      />
    </div>
  );
};
