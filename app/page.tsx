'use client';

import React, { useState, useEffect } from 'react';
import { StatGrid } from '@/components/StatGrid';
import { RiskGauge } from '@/components/RiskGauge';
import { TaxConsole } from '@/components/TaxConsole';
import { Trade, analyzeTrades, calculateRiskOfRuin } from '@/lib/RiskEngine';
import { detectWashSales, suggestTaxLossHarvesting } from '@/lib/WashSaleEngine';
import { Shield, Upload, Download, Wallet, Activity, ArrowUpRight } from 'lucide-react';

const MOCK_TRADES: Trade[] = [
  { id: '1', symbol: 'TSLA', entryDate: '2026-03-10', exitDate: '2026-03-15', pnl: 4500, type: 'LONG', quantity: 10 },
  { id: '2', symbol: 'NVDA', entryDate: '2026-03-12', exitDate: '2026-03-18', pnl: -1200, type: 'LONG', quantity: 5 },
  { id: '3', symbol: 'NVDA', entryDate: '2026-04-05', exitDate: '2026-04-10', pnl: 200, type: 'LONG', quantity: 5 },
  { id: '4', symbol: 'AAPL', entryDate: '2026-03-20', exitDate: '2026-03-22', pnl: 800, type: 'SHORT', quantity: 100 },
];

export default function AlphaTerminal() {
  const [mounted, setMounted] = useState(false);
  const [trades, setTrades] = useState<Trade[]>(MOCK_TRADES);
  const [stats, setStats] = useState<any>(analyzeTrades(MOCK_TRADES));
  const [ror, setRor] = useState(0);
  const [washSales, setWashSales] = useState<any[]>([]);
  const [tlh, setTlh] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const analysis = analyzeTrades(trades);
    setStats(analysis);
    const risk = calculateRiskOfRuin(trades, 10000, 500);
    setRor(risk);
    const ws = detectWashSales(trades);
    setWashSales(ws);
    const openPositions: Trade[] = [
      { id: '5', symbol: 'AMD', entryDate: '2026-02-01', exitDate: '', pnl: -1500, type: 'LONG', quantity: 20 }
    ];
    const suggestions = suggestTaxLossHarvesting(openPositions, 2000);
    setTlh(suggestions);
  }, [trades]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black text-zinc-400 p-8 lg:p-12 selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-xl">
            <Shield className="text-black" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tighter">AlphaTerminal</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-all text-sm font-medium text-white">
            <Upload size={16} />
            Import CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all text-sm font-bold shadow-lg shadow-white/5">
            Connect Broker
            <ArrowUpRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero: Primary Metrics */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em] mb-2">Performance Overview</h2>
            <p className="text-4xl font-bold text-white">Sovereign Dashboard</p>
          </div>
          <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2 text-xs font-medium text-emerald-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Data Processed Locally
          </div>
        </div>
        <StatGrid stats={stats} />
      </section>

      {/* Main Analysis Grid */}
      <section className="grid grid-cols-12 gap-8">
        {/* Left: Risk Status */}
        <div className="col-span-12 lg:col-span-4 min-h-[450px]">
          <RiskGauge probability={ror} />
        </div>

        {/* Right: Tax Insights */}
        <div className="col-span-12 lg:col-span-8 min-h-[450px]">
          <TaxConsole washSales={washSales} tlhSuggestions={tlh} />
        </div>
      </section>

      {/* Footer / Status */}
      <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Wallet size={16} className="text-zinc-600" />
            <span>3 Accounts Linked</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            <Activity size={16} className="text-zinc-600" />
            <span>Last Sync: 2m ago</span>
          </div>
        </div>
        <div className="text-[10px] text-zinc-700 font-mono tracking-widest uppercase">
          &copy; 2026 AlphaTerminal System | Privacy Guaranteed
        </div>
      </footer>
    </div>
  );
}
