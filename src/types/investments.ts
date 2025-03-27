import { Asset, Liability, InvestmentHolding } from '@/utils/localStorage';
import { IncomeSource, FinancialGoal } from '@/pages/Onboarding'; // Import directly from source

// Represents the user's overall profile relevant to investments
export interface UserInvestmentProfile {
  riskTolerance?: 'Conservative' | 'Balanced' | 'Aggressive'; // Example risk levels
  financialSituationSummary?: string; // AI-generated summary or key metrics
  // Potentially link to full UserFinancialProfile from localStorage if needed
  // profileId: string; 
}

// Represents a specific investment product or opportunity
export interface InvestmentProduct {
  id: string;
  name: string;
  category: 'Stock' | 'ETF' | 'Bond' | 'Crypto' | 'RealEstate' | 'Commodity' | 'MutualFund' | 'FixedDeposit';
  tickerSymbol?: string; // e.g., AAPL, BTC
  expectedReturn?: number; // Annualized percentage
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  description: string;
  // Add more fields as needed: e.g., historical performance, fees, minimum investment
}

// Represents an AI-generated recommendation
export interface InvestmentRecommendation {
  id: string;
  product: InvestmentProduct;
  reasoning: string; // AI explanation for the recommendation
  confidenceScore?: number;
  suggestedAllocation?: number; // Percentage or amount
  timestamp: string;
}

// Represents a data point for projection charts
export interface ProjectionDataPoint {
  date: string; // Could be year, month, etc.
  value: number; // Projected portfolio value
  scenario?: string; // For 'What If' simulations
}

// Represents a high-yield savings product
export interface SavingsProduct {
  id: string;
  provider: string;
  productName: string;
  apy: number; // Annual Percentage Yield
  type: 'SavingsAccount' | 'FixedDeposit' | 'MoneyMarket';
  minimumBalance?: number;
  url?: string;
}

// Represents a passive income source suggestion
export interface PassiveIncomeSource {
  id: string;
  type: 'DividendStock' | 'REIT' | 'Staking' | 'YieldFarming' | 'RentalProperty'; // Example types
  name: string; // e.g., "Apple Inc.", "XYZ REIT", "Ethereum Staking"
  potentialReturn: string; // e.g., "Est. 3% dividend yield", "Variable APY"
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
}

// Represents an alert or reminder
export interface InvestmentAlert {
  id: string;
  type: 'SIPReminder' | 'PriceAlert' | 'TaxDeadline';
  target: string; // e.g., "Nifty 50 ETF SIP", "BTC Price", "ELSS Investment"
  condition?: string; // e.g., "Reaches $50,000", "Falls below $1,000"
  dueDate?: string; // For reminders
  notes?: string;
  isActive: boolean;
}

// Represents the overall portfolio structure
export interface Portfolio {
  totalValue: number;
  holdings: InvestmentHolding[]; // From localStorage
  assetAllocation: { [category: string]: number }; // e.g., { Stocks: 40, Crypto: 20, ... }
  diversificationScore?: number; // 0-100
  recentPerformance?: number; // % change over a period
  idleCash?: number; // Amount of uninvested cash detected
}

// Represents data for the Debt-to-Investment Ratio
export interface DebtInvestmentRatioInfo {
  totalDebt: number;
  totalInvestments: number;
  ratio: number;
  recommendation?: string; // AI suggestion
}

// Represents the content of an AI-generated report
export interface InvestmentReport {
  id: string;
  period: string; // e.g., "Week 12, 2025", "March 2025"
  generatedDate: string;
  portfolioSnapshot: Portfolio;
  performanceAnalysis: string; // Text summary
  growthPrediction: string; // Text summary
  aiSuggestions: string[]; // List of actionable suggestions
}

// Combining relevant types for the Investments page context
export interface InvestmentsPageData {
  userProfile: UserInvestmentProfile;
  portfolio: Portfolio;
  recommendations: InvestmentRecommendation[];
  projections: ProjectionDataPoint[];
  savingsProducts: SavingsProduct[];
  passiveIncomeSources: PassiveIncomeSource[];
  debtInfo: DebtInvestmentRatioInfo;
  alerts: InvestmentAlert[];
  latestReport?: InvestmentReport;
}
