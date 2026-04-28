import { Trade } from './RiskEngine';

export interface WashSaleViolation {
  lossTrade: Trade;
  replacementTrade: Trade;
  disallowedLoss: number;
}

/**
 * Detects wash sales across a list of trades.
 * A wash sale occurs when a security is sold at a loss and, 
 * within 30 days before or after the sale, the trader buys "substantially identical" stock or securities.
 */
export function detectWashSales(trades: Trade[]): WashSaleViolation[] {
  const violations: WashSaleViolation[] = [];
  const sortedTrades = [...trades].sort((a, b) => new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime());

  const losses = sortedTrades.filter(t => t.pnl < 0);
  const buys = sortedTrades; // Any trade could be a replacement buy (if it's a purchase of the same symbol)

  losses.forEach(lossTrade => {
    const lossDate = new Date(lossTrade.exitDate);
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    const replacements = buys.filter(buyTrade => {
      if (buyTrade.id === lossTrade.id) return false;
      if (buyTrade.symbol !== lossTrade.symbol) return false;
      
      const buyDate = new Date(buyTrade.entryDate);
      const diff = Math.abs(buyDate.getTime() - lossDate.getTime());
      
      return diff <= thirtyDays;
    });

    if (replacements.length > 0) {
      violations.push({
        lossTrade,
        replacementTrade: replacements[0], // Simplified: just flag the first one
        disallowedLoss: Math.abs(lossTrade.pnl)
      });
    }
  });

  return violations;
}

export function suggestTaxLossHarvesting(openPositions: Trade[], currentGains: number): Trade[] {
  // Suggest closing losing positions that haven't been traded in 30 days to avoid immediate wash sale
  const now = new Date();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return openPositions.filter(p => {
    if (p.pnl >= 0) return false;
    const entryDate = new Date(p.entryDate);
    return (now.getTime() - entryDate.getTime()) > thirtyDays;
  });
}
