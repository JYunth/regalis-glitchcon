
import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import { Transaction, getUserData } from '@/utils/localStorage';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const userData = getUserData();
      // Get only the 5 most recent transactions
      setTransactions(userData.transactions.slice(0, 5));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <GlassCard className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-xl text-deep-charcoal">Recent Transactions</h3>
        <button className="text-soft-gold text-sm hover:underline transition-all">
          View All
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="h-16 bg-subtle-gray/20 animate-pulse rounded-md"
              style={{animationDelay: `${i * 0.1}s`}}
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div 
              key={transaction.id}
              className="flex justify-between items-center py-3 border-b border-subtle-gray/20 last:border-none animate-slide-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-start">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-soft-emerald/10' : 'bg-subtle-gray/10'
                }`}>
                  <span className={`text-sm ${
                    transaction.amount > 0 ? 'text-soft-emerald' : 'text-deep-charcoal/70'
                  }`}>
                    {transaction.category.charAt(0)}
                  </span>
                </div>
                
                <div className="ml-3">
                  <p className="text-deep-charcoal font-medium">{transaction.description}</p>
                  <p className="text-deep-charcoal/60 text-sm">{formatDate(transaction.date)}</p>
                </div>
              </div>
              
              <span className={`font-medium ${
                transaction.amount > 0 ? 'text-soft-emerald' : 'text-deep-charcoal'
              }`}>
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default RecentTransactions;
