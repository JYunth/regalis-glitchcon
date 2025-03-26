
import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import { Budget, getUserData } from '@/utils/localStorage';

const BudgetProgress = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const userData = getUserData();
      setBudgets(userData.budgets);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate percentage of budget used
  const calculatePercentage = (spent: number, allocated: number) => {
    return Math.min(Math.round((spent / allocated) * 100), 100);
  };

  // Determine color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-soft-emerald';
    if (percentage < 80) return 'bg-soft-gold';
    return 'bg-muted-red';
  };

  return (
    <GlassCard className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-xl text-deep-charcoal">Budget Overview</h3>
        <button className="gold-btn-small">
          Adjust Budgets
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-2" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="h-5 bg-subtle-gray/20 rounded w-1/3"></div>
              <div className="h-4 bg-subtle-gray/20 rounded w-full"></div>
              <div className="h-2 bg-subtle-gray/20 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {budgets.map((budget, index) => {
            const percentage = calculatePercentage(budget.spent, budget.allocated);
            return (
              <div 
                key={budget.id} 
                className="animate-slide-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-deep-charcoal">{budget.category}</h4>
                  <div className="text-deep-charcoal/70 text-sm">
                    {formatCurrency(budget.spent)} <span className="text-deep-charcoal/50">of {formatCurrency(budget.allocated)}</span>
                  </div>
                </div>
                
                <div className="h-2 bg-subtle-gray/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-deep-charcoal/50">
                    {percentage}% used
                  </span>
                  <span className="text-xs text-deep-charcoal/50">
                    {formatCurrency(budget.allocated - budget.spent)} remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
};

export default BudgetProgress;
