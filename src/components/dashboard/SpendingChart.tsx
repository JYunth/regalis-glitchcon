
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../ui/GlassCard';
import { Transaction, getUserData } from '@/utils/localStorage';

interface CategoryTotal {
  name: string;
  value: number;
}

const SpendingChart = () => {
  const [categoryData, setCategoryData] = useState<CategoryTotal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Colors for pie chart
  const COLORS = ['#E4CDA7', '#F7F5F2', '#DADADA', '#A3C9A8', '#D87C7C'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const userData = getUserData();
      
      // Filter for expense transactions (negative amounts)
      const expenses = userData.transactions.filter(t => t.amount < 0);
      
      // Group by category and sum amounts
      const categoryTotals: { [key: string]: number } = {};
      
      expenses.forEach((transaction: Transaction) => {
        const category = transaction.category;
        const absAmount = Math.abs(transaction.amount);
        
        if (categoryTotals[category]) {
          categoryTotals[category] += absAmount;
        } else {
          categoryTotals[category] = absAmount;
        }
      });
      
      // Convert to array format for chart
      const chartData = Object.keys(categoryTotals).map(category => ({
        name: category,
        value: categoryTotals[category]
      }));
      
      setCategoryData(chartData);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-2 text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-soft-gold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="w-full h-full">
      <h3 className="font-serif text-xl text-deep-charcoal mb-6">Spending by Category</h3>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full bg-subtle-gray/20 animate-pulse"></div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#E4CDA7"
                dataKey="value"
                animationDuration={800}
                animationBegin={300}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {!isLoading && categoryData.slice(0, 6).map((category, index) => (
          <div 
            key={category.name} 
            className="flex items-center space-x-2 animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-deep-charcoal text-xs truncate">{category.name}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default SpendingChart;
