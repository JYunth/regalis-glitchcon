import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';

interface FinancialOverviewWidgetProps {
  userFinancialProfile: UserFinancialProfile;
}

const FinancialOverviewWidget: React.FC<FinancialOverviewWidgetProps> = ({ userFinancialProfile }) => {
  const totalAssets = userFinancialProfile.assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = userFinancialProfile.liabilities.reduce((sum, liability) => sum + liability.balance, 0);
  const netWorth = totalAssets - totalLiabilities;
  // Implement monthly cash flow calculation based on income and expenses
  const monthlyCashFlow = userFinancialProfile.incomeSources.reduce((sum, income) => sum + income.amount, 0) -
    Object.values(userFinancialProfile.expenseBudgets).reduce((sum, budget) => sum + budget, 0);
  
  // Get currency from profile, default to USD if not found
  const currencyCode = userFinancialProfile.settings?.currency ?? 'USD'; 

  // Updated formatCurrency to accept currency code
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { // Assuming 'en-US' locale for formatting, adjust if needed
      style: 'currency',
      currency: currency, 
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <GlassCard className="w-full">
      <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          {/* Changed text-gray-500 to text-gray-600 for better contrast */}
          <p className="text-sm text-gray-600">Total Assets</p>
          {/* Pass dynamic currency */}
          <p className="text-xl font-medium">{formatCurrency(totalAssets, currencyCode)}</p> 
        </div>
        <div>
          {/* Changed text-gray-500 to text-gray-600 for better contrast */}
          <p className="text-sm text-gray-600">Net Worth</p>
          {/* Pass dynamic currency */}
          <p className="text-xl font-medium">{formatCurrency(netWorth, currencyCode)}</p>
        </div>
        <div>
          {/* Changed text-gray-500 to text-gray-600 for better contrast */}
          {/* Clarified label assuming calculation is based on budget */}
          <p className="text-sm text-gray-600">Projected Monthly Cash Flow</p> 
          {/* Pass dynamic currency */}
          <p className="text-xl font-medium">{formatCurrency(monthlyCashFlow, currencyCode)}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default FinancialOverviewWidget;
