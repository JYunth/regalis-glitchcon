
import { 
  Transaction, 
  Budget, 
  Investment, 
  ChatMessage, 
  getUserData, 
  updateUserData 
} from './localStorage';

// Generate random transactions
const generateTransactions = (): Transaction[] => {
  const categories = ['Dining', 'Shopping', 'Transportation', 'Entertainment', 'Utilities', 'Groceries', 'Healthcare', 'Travel'];
  const merchants = {
    'Dining': ['La Belle Bistro', 'Café Milano', 'The Golden Spoon', 'Sushi Excellence', 'Elegant Eats'],
    'Shopping': ['Luxury Boutique', 'Designer Emporium', 'Fashion Forward', 'Elite Electronics', 'Home Elegance'],
    'Transportation': ['Premier Car Service', 'Luxury Rides', 'Executive Transit', 'City Commute', 'Airport Express'],
    'Entertainment': ['Grand Theatre', 'Luxury Cinema', 'Symphony Hall', 'Art Exhibition', 'Elite Club'],
    'Utilities': ['City Power', 'Clear Waters Co.', 'Connected Internet', 'Gas Provider', 'Home Services'],
    'Groceries': ['Gourmet Market', 'Fresh Selections', 'Organic Essentials', 'Premium Foods', 'Artisan Grocery'],
    'Healthcare': ['Wellness Center', 'Premiere Medical', 'Dental Excellence', 'Vision Care', 'Pharmacy Plus'],
    'Travel': ['Luxury Stays', 'First Class Airways', 'Exclusive Resorts', 'Vacation Packages', 'Cruise Elegance']
  };

  const transactions: Transaction[] = [];
  const currentDate = new Date();
  
  // Generate 20 transactions for the past 30 days
  for (let i = 0; i < 20; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const transactionDate = new Date(currentDate);
    transactionDate.setDate(currentDate.getDate() - daysAgo);
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchantList = merchants[category as keyof typeof merchants];
    const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];
    
    // Random amount between $5 and $500
    const amount = -(Math.floor(Math.random() * 49500) / 100 + 5).toFixed(2);
    
    transactions.push({
      id: `txn-${Date.now()}-${i}`,
      date: transactionDate.toISOString(),
      description: merchant,
      amount: parseFloat(amount),
      category
    });
  }
  
  // Add a few income transactions
  const incomeDescriptions = ['Salary Deposit', 'Freelance Payment', 'Investment Return', 'Client Payment', 'Bonus'];
  
  for (let i = 0; i < 3; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const transactionDate = new Date(currentDate);
    transactionDate.setDate(currentDate.getDate() - daysAgo);
    
    // Random income between $500 and $5000
    const amount = (Math.floor(Math.random() * 450000) / 100 + 500).toFixed(2);
    
    transactions.push({
      id: `txn-${Date.now()}-income-${i}`,
      date: transactionDate.toISOString(),
      description: incomeDescriptions[Math.floor(Math.random() * incomeDescriptions.length)],
      amount: parseFloat(amount),
      category: 'Income'
    });
  }
  
  // Sort transactions by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate budget categories
const generateBudgets = (): Budget[] => {
  return [
    {
      id: 'budget-1',
      category: 'Dining',
      allocated: 800,
      spent: 650
    },
    {
      id: 'budget-2',
      category: 'Shopping',
      allocated: 1000,
      spent: 920
    },
    {
      id: 'budget-3',
      category: 'Transportation',
      allocated: 400,
      spent: 210
    },
    {
      id: 'budget-4',
      category: 'Entertainment',
      allocated: 600,
      spent: 480
    },
    {
      id: 'budget-5',
      category: 'Utilities',
      allocated: 500,
      spent: 500
    },
    {
      id: 'budget-6',
      category: 'Groceries',
      allocated: 700,
      spent: 520
    },
    {
      id: 'budget-7',
      category: 'Healthcare',
      allocated: 300,
      spent: 125
    },
    {
      id: 'budget-8',
      category: 'Travel',
      allocated: 1500,
      spent: 750
    }
  ];
};

// Generate investment suggestions
const generateInvestments = (): Investment[] => {
  return [
    {
      id: 'inv-1',
      name: 'Balanced Growth Portfolio',
      type: 'ETF',
      riskLevel: 'Medium',
      returnRate: 8.4,
      description: 'A diversified mix of stocks and bonds designed for steady long-term growth with moderate risk.'
    },
    {
      id: 'inv-2',
      name: 'Sustainable Future Fund',
      type: 'Mutual Fund',
      riskLevel: 'Medium',
      returnRate: 7.5,
      description: 'Focused on companies committed to environmental sustainability and social responsibility.'
    },
    {
      id: 'inv-3',
      name: 'Technology Innovation Index',
      type: 'ETF',
      riskLevel: 'High',
      returnRate: 12.8,
      description: 'Tracks leading technology companies at the forefront of innovation and digital transformation.'
    },
    {
      id: 'inv-4',
      name: 'Global Dividend Aristocrats',
      type: 'ETF',
      riskLevel: 'Low',
      returnRate: 5.7,
      description: 'Companies with a history of consistently increasing dividend payments over time.'
    },
    {
      id: 'inv-5',
      name: 'Premium Bond Portfolio',
      type: 'Bonds',
      riskLevel: 'Low',
      returnRate: 4.2,
      description: 'High-quality corporate and government bonds offering stable income with minimal risk.'
    }
  ];
};

// Generate sample chat history
const generateChatHistory = (): ChatMessage[] => {
  return [
    {
      id: 'msg-1',
      sender: 'user',
      message: 'How can I improve my savings rate?',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
    },
    {
      id: 'msg-2',
      sender: 'ai',
      message: 'I recommend implementing the 50/30/20 rule: allocate 50% of your income to needs, 30% to wants, and 20% to savings and investments. Based on your spending patterns, you could increase your savings rate by reducing dining expenses and redirecting those funds to your savings account.',
      timestamp: new Date(Date.now() - 86400000 * 2 + 30000).toISOString() // 30 seconds after previous message
    },
    {
      id: 'msg-3',
      sender: 'user',
      message: 'What investment opportunities should I consider?',
      timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: 'msg-4',
      sender: 'ai',
      message: 'Based on your risk profile and financial goals, I recommend exploring the Balanced Growth Portfolio. It offers a good mix of growth potential and stability with an average annual return of 8.4%. Would you like me to provide more details about this investment option?',
      timestamp: new Date(Date.now() - 86400000 + 45000).toISOString() // 45 seconds after previous message
    }
  ];
};

// Load demo data into localStorage
export const loadDemoData = (): void => {
  const userData = getUserData();
  
  // Only load demo data if there's no existing data
  if (userData.transactions.length === 0) {
    updateUserData('transactions', generateTransactions());
  }
  
  if (userData.budgets.length === 0) {
    updateUserData('budgets', generateBudgets());
  }
  
  if (userData.investments.length === 0) {
    updateUserData('investments', generateInvestments());
  }
  
  if (userData.chatHistory.length === 0) {
    updateUserData('chatHistory', generateChatHistory());
  }
};
