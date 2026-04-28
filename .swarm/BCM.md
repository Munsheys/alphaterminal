# BCM Manifest: AlphaTerminal

## Hard Constraints
- [x] **BCM-1: Local-First Data Processing**: Implemented in `RiskEngine.ts` and `WashSaleEngine.ts`.
- [x] **BCM-2: Cross-Account Wash Sale Engine**: Implemented in `WashSaleEngine.ts`.
- [x] **BCM-3: Risk-of-Ruin Simulator**: Implemented in `RiskEngine.ts`.
- [x] **BCM-4: Tax-Loss Harvesting (TLH) Alerts**: Implemented in `TaxConsole.tsx`.
- [x] **BCM-5: Neo-Terminal UI**: Implemented in `page.tsx` and components.
- [x] **BCM-6: Monetization CTA**: Implemented in `page.tsx` (Pro-tier alert).

## Deployment Lock Prerequisite
- [x] All above constraints must be verified via browser/code by RV-001 before Phase 9.

## Iteration 1 Goals (Clean Command Overhaul)
- [x] **BCM-IT1-1: The 3-Second Rule**: Primary value (P&L, Risk, Tax) is now massive and readable.
- [x] **BCM-IT1-2: Actionable Tax Alerts**: Terminal console replaced by `InsightPanel` cards.
- [x] **BCM-IT1-3: Simplified Risk Status**: Radial gauge replaced by linear "Threat Level" bar.
- [x] **BCM-IT1-4: White-Space Polish**: Layout expanded with 2xl border radius and p-12 padding.
