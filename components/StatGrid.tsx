import React from 'react';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtext?: string;
}

const StatCard = ({ label, value, icon, color, subtext }: StatProps) => (
  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl transition-all hover:border-zinc-700">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-zinc-800" style={{ color }}>{icon}</div>
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-4xl font-bold tracking-tight text-white mb-2">{value}</div>
    {subtext && <p className="text-xs text-zinc-500 font-medium">{subtext}</p>}
  </div>
);

export const StatGrid = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Total P&L" 
        value={`$${stats.expectedValue.toFixed(0)}`} 
        icon={<TrendingUp size={20} />} 
        color="#10B981" 
        subtext="Expected return based on history"
      />
      <StatCard 
        label="Win Rate" 
        value={`${(stats.winRate * 100).toFixed(0)}%`} 
        icon={<Target size={20} />} 
        color="#3B82F6" 
        subtext="Percentage of profitable trades"
      />
      <StatCard 
        label="Profit Factor" 
        value={stats.profitFactor.toFixed(2)} 
        icon={<Zap size={20} />} 
        color="#F59E0B" 
        subtext="Gross gain vs Gross loss"
      />
      <StatCard 
        label="Max Drawdown" 
        value={`-$${stats.maxDrawdown.toFixed(0)}`} 
        icon={<TrendingDown size={20} />} 
        color="#EF4444" 
        subtext="Peak-to-trough decline"
      />
    </div>
  );
};
