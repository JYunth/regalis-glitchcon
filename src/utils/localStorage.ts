import { IncomeSource, FinancialGoal } from '@/pages/Onboarding';

// Type definitions for our data
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  alertThreshold?: number;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  returnRate: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export interface UserSettings {
  name: string;
  email: string;
  currency: string;
  notifications: boolean;
}

export interface Asset { type: string; description: string; value: number; }
export interface Liability { type: string; description: string; balance: number; interestRate?: number; }
export interface InvestmentHolding { type: string; name: string; value: number; }

export interface UserFinancialProfile {
  // From Onboarding.tsx
  incomeSources: IncomeSource[];
  expenseBudgets: { [category: string]: number };
  financialGoals: FinancialGoal[];
  assets: Asset[];
  liabilities: Liability[];
  investments: InvestmentHolding[]; // actual investments
  riskToleranceScore?: number;
  financialHealthScore?: number;
  onboardingComplete: boolean;
  
  // Added for Investment Performance History (Phase A.4)
  portfolioHistory: { timestamp: string; totalValue: number }[];
  lastHistoryUpdateTimestamp?: string;

  // From localStorage.ts (existing)
  balance: number;
  transactions: Transaction[];
  budgets: Budget[];
  investmentSuggestions: Investment[]; // investment suggestions
  chatHistory: ChatMessage[];
  settings: UserSettings;
}

// Initialize with default data if none exists
const initializeUserData = (): UserFinancialProfile => {
  const defaultData: UserFinancialProfile = {
    incomeSources: [],
    expenseBudgets: {},
    financialGoals: [],
    assets: [],
    liabilities: [],
    investments: [],
    riskToleranceScore: 0,
    financialHealthScore: 0,
    onboardingComplete: false,
    balance: 24680.42,
    transactions: [],
    budgets: [],
    investmentSuggestions: [], // investment suggestions
    chatHistory: [],
    settings: {
      name: 'Alexandra Wilson',
      email: 'alex@example.com',
      currency: 'USD',
      notifications: true,
    },
    // Initialize new history fields directly in the object literal
    portfolioHistory: [],
    lastHistoryUpdateTimestamp: undefined 
  };
  
  localStorage.setItem('userFinancialProfile', JSON.stringify(defaultData));
  return defaultData;
};

// Get user data from localStorage
export const getUserData = (): UserFinancialProfile => {
  const data = localStorage.getItem('userFinancialProfile');
  
  if (!data) {
    return initializeUserData();
  }
  
  return JSON.parse(data);
};

// Save user data to localStorage
export const saveUserData = (data: UserFinancialProfile): void => {
  localStorage.setItem('userFinancialProfile', JSON.stringify(data));
};

// Update specific parts of user data
export const updateUserData = <K extends keyof UserFinancialProfile>(key: K, value: UserFinancialProfile[K]): UserFinancialProfile => {
  const userData = getUserData();
  userData[key] = value;
  saveUserData(userData);
  return userData;
};

// Clear all user data
export const clearUserData = (): void => {
  localStorage.removeItem('userFinancialProfile');
};
