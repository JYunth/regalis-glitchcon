import { InvestmentHolding } from './localStorage';

/**
 * Calculates the total value of all investment holdings.
 * @param investments - An array of InvestmentHolding objects.
 * @returns The sum of the 'value' property of all holdings.
 */
export const calculateTotalPortfolioValue = (investments: InvestmentHolding[]): number => {
  if (!investments || investments.length === 0) {
    return 0;
  }
  return investments.reduce((sum, holding) => sum + (holding.value || 0), 0);
};

// Add other portfolio-related utility functions here if needed in the future.
