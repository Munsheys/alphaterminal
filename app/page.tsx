'use client';

import React, { useState, useEffect } from 'react';
import { StatGrid } from '@/components/StatGrid';
import { RiskGauge } from '@/components/RiskGauge';
import { TaxConsole } from '@/components/TaxConsole';
import { Trade, analyzeTrades, calculateRiskOfRuin } from '@/lib/RiskEngine';
import { detectWashSales, suggestTaxLossHarvesting } from '@/lib/WashSaleEngine';
import { Shield, Upload, Download, Activity, Lock } from 'lucide-react';

// Mock data for initial view
const MOCK_TRADES: Trade[] = [
  { id: '1', symbol: 'TSLA', entryDate: '2026-03-10', exitDate: '2026-03-15', pnl: 450, type: 'LONG', quantity: 10 },
  { id: '2', symbol: 'NVDA', entryDate: '2026-03-12', exitDate: '2026-03-18', pnl: -1200, type: 'LONG', quantity: 5 },
  { id: '3', symbol: 'NVDA', entryDate: '2026-04-05', exitDate: '2026-04-10', pnl: 200, type: 'LONG', quantity: 5 }, // Wash sale
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
    
    // Calculate Risk of Ruin
    const risk = calculateRiskOfRuin(trades, 10000, 500);
    setRor(risk);

    // Detect Wash Sales
    const ws = detectWashSales(trades);
    setWashSales(ws);

    // Suggest TLH (using open positions mock)
    const openPositions: Trade[] = [
      { id: '5', symbol: 'AMD', entryDate: '2026-02-01', exitDate: '', pnl: -500, type: 'LONG', quantity: 20 }
    ];
    const suggestions = suggestTaxLossHarvesting(openPositions, 2000);
    setTlh(suggestions);
  }, [trades]);

  if (!mounted) return <div className="min-h-screen bg-[#0B0C10]" />;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#c5c6c7] p-6 selection:bg-[#66FCF1] selection:text-black">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#66FCF1] p-2 rounded-lg">
            <Shield className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-100 font-mono tracking-tighter">ALPHA_TERMINAL <span className="text-[#66FCF1]">v1.0.4</span></h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Sovereign Risk & Tax Orchestrator</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          {trades.length > 5 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/50 rounded-md text-amber-500 text-[10px] font-mono animate-pulse">
              <Zap size={12} />
              PRO_MODE_REQUIRED_FOR_UNLIMITED_DATA
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors font-mono text-xs">
            <Upload size={14} />
            IMPORT_DATA
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#66FCF1] text-black rounded-md hover:bg-[#45a29e] transition-colors font-bold font-mono text-xs">
            <Download size={14} />
            EXPORT_LOG
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-12 gap-6">
        {/* Top Row: Stats */}
        <div className="col-span-12">
          <StatGrid stats={stats} />
        </div>

        {/* Middle Row: Risk & Console */}
        <div className="col-span-12 lg:col-span-4 h-[400px]">
          <RiskGauge probability={ror} />
        </div>

        <div className="col-span-12 lg:col-span-8 h-[400px]">
          <TaxConsole washSales={washSales} tlhSuggestions={tlh} />
        </div>

        {/* Bottom Row: Info */}
        <div className="col-span-12 mt-4 bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase">
            <Lock size={12} className="text-emerald-500" />
            <span>Local-First Encryption Active | Zero Data Leaked</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>System Nominal</span>
            </div>
            <span>Uptime: 100%</span>
          </div>
        </div>
      </main>
    </div>
  );
}
