import * as ss from 'simple-statistics';

export interface Trade {
  id: string;
  symbol: string;
  entryDate: string;
  exitDate: string;
  pnl: number;
  type: 'LONG' | 'SHORT';
  quantity: number;
}

export interface RiskAnalysis {
  riskOfRuin: number;
  expectedValue: number;
  profitFactor: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  maxDrawdown: number;
}

export function calculateRiskOfRuin(trades: Trade[], startingEquity: number, riskPerTrade: number, numSimulations = 1000, maxSteps = 250): number {
  if (trades.length === 0) return 0;

  const returns = trades.map(t => t.pnl);
  let ruinCount = 0;

  for (let i = 0; i < numSimulations; i++) {
    let equity = startingEquity;
    for (let step = 0; step < maxSteps; step++) {
      const randomReturn = returns[Math.floor(Math.random() * returns.length)];
      equity += randomReturn;
      if (equity <= 0) {
        ruinCount++;
        break;
      }
    }
  }

  return (ruinCount / numSimulations) * 100;
}

export function analyzeTrades(trades: Trade[]): RiskAnalysis {
  if (trades.length === 0) {
    return { riskOfRuin: 0, expectedValue: 0, profitFactor: 0, winRate: 0, avgWin: 0, avgLoss: 0, maxDrawdown: 0 };
  }

  const pnls = trades.map(t => t.pnl);
  const wins = pnls.filter(p => p > 0);
  const losses = pnls.filter(p => p < 0);

  const winRate = wins.length / pnls.length;
  const avgWin = wins.length > 0 ? ss.mean(wins) : 0;
  const avgLoss = losses.length > 0 ? Math.abs(ss.mean(losses)) : 0;
  const profitFactor = avgLoss === 0 ? wins.reduce((a, b) => a + b, 0) : wins.reduce((a, b) => a + b, 0) / Math.abs(losses.reduce((a, b) => a + b, 0));
  const expectedValue = (winRate * avgWin) - ((1 - winRate) * avgLoss);

  // Simple Max Drawdown calculation
  let peak = 0;
  let maxDD = 0;
  let runningPnl = 0;
  pnls.forEach(p => {
    runningPnl += p;
    if (runningPnl > peak) peak = runningPnl;
    const dd = peak - runningPnl;
    if (dd > maxDD) maxDD = dd;
  });

  return {
    riskOfRuin: 0, // Calculated separately
    expectedValue,
    profitFactor,
    winRate,
    avgWin,
    avgLoss,
    maxDrawdown: maxDD
  };
}
