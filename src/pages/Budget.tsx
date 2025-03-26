
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import BudgetProgress from '@/components/budget/BudgetProgress';
import { Transaction, Budget, getUserData } from '@/utils/localStorage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { loadDemoData } from '@/utils/demoData';

const BudgetPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [monthlyTotals, setMonthlyTotals] = useState<{name: string, spent: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load demo data
    loadDemoData();
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      const userData = getUserData();
      setTransactions(userData.transactions);
      setBudgets(userData.budgets);
      
      // Calculate monthly spending totals for the chart
      const monthlyData = calculateMonthlySpending(userData.transactions);
      setMonthlyTotals(monthlyData);
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate monthly spending from transactions
  const calculateMonthlySpending = (transactions: Transaction[]) => {
    const months: {[key: string]: number} = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get current month and 5 previous months
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - i);
      const monthKey = `${monthNames[month.getMonth()]} ${month.getFullYear()}`;
      months[monthKey] = 0;
    }
    
    // Sum expenses by month
    transactions.forEach(transaction => {
      if (transaction.amount < 0) { // Only count expenses
        const date = new Date(transaction.date);
        const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        
        if (months[monthKey] !== undefined) {
          months[monthKey] += Math.abs(transaction.amount);
        }
      }
    });
    
    // Convert to array format for chart
    return Object.keys(months).map(month => ({
      name: month,
      spent: parseFloat(months[month].toFixed(2))
    }));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-2 text-sm">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-soft-gold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate total monthly budget
  const calculateTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.allocated, 0);
  };

  // Calculate total spent this month
  const calculateTotalSpent = () => {
    return budgets.reduce((total, budget) => total + budget.spent, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Budget Management
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Summary Cards */}
            <GlassCard className="animate-fade-in">
              <h3 className="text-deep-charcoal/60 text-sm font-sans">Total Monthly Budget</h3>
              {isLoading ? (
                <div className="h-10 w-32 bg-subtle-gray/20 animate-pulse mt-2 rounded-md"></div>
              ) : (
                <h2 className="text-3xl font-serif font-medium mt-2 text-deep-charcoal">
                  {formatCurrency(calculateTotalBudget())}
                </h2>
              )}
              <div className="mt-4 text-sm text-deep-charcoal/60">
                Allocated across {isLoading ? '...' : budgets.length} categories
              </div>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-deep-charcoal/60 text-sm font-sans">Spent This Month</h3>
              {isLoading ? (
                <div className="h-10 w-32 bg-subtle-gray/20 animate-pulse mt-2 rounded-md"></div>
              ) : (
                <h2 className="text-3xl font-serif font-medium mt-2 text-deep-charcoal">
                  {formatCurrency(calculateTotalSpent())}
                </h2>
              )}
              <div className="mt-4 text-sm text-deep-charcoal/60">
                {isLoading ? '' : 
                  `${Math.round((calculateTotalSpent() / calculateTotalBudget()) * 100)}% of monthly budget`
                }
              </div>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-deep-charcoal/60 text-sm font-sans">Remaining</h3>
              {isLoading ? (
                <div className="h-10 w-32 bg-subtle-gray/20 animate-pulse mt-2 rounded-md"></div>
              ) : (
                <h2 className="text-3xl font-serif font-medium mt-2 text-deep-charcoal">
                  {formatCurrency(calculateTotalBudget() - calculateTotalSpent())}
                </h2>
              )}
              <div className="mt-4 text-sm text-deep-charcoal/60">
                Available to spend this month
              </div>
            </GlassCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Budget details */}
            <div className="lg:col-span-2">
              <GlassCard>
                <h3 className="font-serif text-xl text-deep-charcoal mb-6">Monthly Spending Trend</h3>
                {isLoading ? (
                  <div className="h-64 bg-subtle-gray/20 animate-pulse rounded-md"></div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyTotals}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#DADADA" opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fill: '#2D2D2D', opacity: 0.7 }} />
                        <YAxis 
                          tickFormatter={(value) => `$${value}`} 
                          tick={{ fill: '#2D2D2D', opacity: 0.7 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="spent" fill="#E4CDA7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </GlassCard>
            </div>
            
            <div className="lg:col-span-1">
              <GlassCard className="h-full">
                <h3 className="font-serif text-xl text-deep-charcoal mb-6">Budget Controls</h3>
                
                <div className="space-y-4">
                  <button className="gold-btn w-full">
                    Create New Budget
                  </button>
                  
                  <button className="border border-subtle-gray text-deep-charcoal/80 font-medium px-4 py-3 rounded-md hover:bg-subtle-gray/10 transition-all duration-300 w-full">
                    Export Budget Report
                  </button>
                  
                  <button className="border border-subtle-gray text-deep-charcoal/80 font-medium px-4 py-3 rounded-md hover:bg-subtle-gray/10 transition-all duration-300 w-full">
                    Set Budget Alerts
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-subtle-gray/20">
                  <h4 className="font-medium text-deep-charcoal mb-2">Budget Performance</h4>
                  {isLoading ? (
                    <div className="h-8 bg-subtle-gray/20 animate-pulse rounded-md"></div>
                  ) : (
                    <>
                      <div className="text-2xl font-serif text-deep-charcoal">
                        {calculateTotalBudget() > calculateTotalSpent() ? 'On Track' : 'Over Budget'}
                      </div>
                      <p className="text-deep-charcoal/60 text-sm mt-1">
                        {calculateTotalBudget() > calculateTotalSpent() 
                          ? 'You\'re managing your spending well this month.' 
                          : 'You\'ve exceeded your monthly budget targets.'}
                      </p>
                    </>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
          
          {/* Budget Categories */}
          <BudgetProgress />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BudgetPage;
