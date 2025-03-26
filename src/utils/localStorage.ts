
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

export interface UserData {
  balance: number;
  transactions: Transaction[];
  budgets: Budget[];
  investments: Investment[];
  chatHistory: ChatMessage[];
  settings: UserSettings;
}

// Initialize with default data if none exists
const initializeUserData = (): UserData => {
  const defaultData = {
    balance: 24680.42,
    transactions: [],
    budgets: [],
    investments: [],
    chatHistory: [],
    settings: {
      name: 'Alexandra Wilson',
      email: 'alex@example.com',
      currency: 'USD',
      notifications: true,
    }
  };
  
  localStorage.setItem('regalis_user_data', JSON.stringify(defaultData));
  return defaultData;
};

// Get user data from localStorage
export const getUserData = (): UserData => {
  const data = localStorage.getItem('regalis_user_data');
  
  if (!data) {
    return initializeUserData();
  }
  
  return JSON.parse(data);
};

// Save user data to localStorage
export const saveUserData = (data: UserData): void => {
  localStorage.setItem('regalis_user_data', JSON.stringify(data));
};

// Update specific parts of user data
export const updateUserData = <K extends keyof UserData>(key: K, value: UserData[K]): UserData => {
  const userData = getUserData();
  userData[key] = value;
  saveUserData(userData);
  return userData;
};

// Clear all user data
export const clearUserData = (): void => {
  localStorage.removeItem('regalis_user_data');
};
