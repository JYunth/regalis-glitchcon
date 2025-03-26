
import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import { getUserData } from '@/utils/localStorage';

const BalanceCard = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const userData = getUserData();
      setBalance(userData.balance);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Format currency with commas and 2 decimal places
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <GlassCard className="w-full">
      <div className="flex flex-col items-start">
        <h3 className="text-deep-charcoal/60 text-sm font-sans">Total Balance</h3>
        {isLoading ? (
          <div className="h-14 w-48 bg-subtle-gray/20 animate-pulse mt-2 rounded-md"></div>
        ) : (
          <h2 className="text-4xl md:text-5xl font-serif font-medium mt-2 text-deep-charcoal animate-counter">
            {formatCurrency(balance)}
          </h2>
        )}
        <p className="text-deep-charcoal/60 text-sm mt-2 font-sans">
          Available in your main account
        </p>
      </div>
      <div className="mt-6 flex gap-4">
        <button className="gold-btn-small">
          Transfer
        </button>
        <button className="border border-subtle-gray text-deep-charcoal/80 font-medium px-4 py-2 text-sm rounded-md hover:bg-subtle-gray/10 transition-all duration-300">
          View History
        </button>
      </div>
    </GlassCard>
  );
};

export default BalanceCard;
