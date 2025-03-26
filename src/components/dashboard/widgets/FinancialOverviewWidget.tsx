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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <GlassCard className="w-full">
      <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Assets</p>
          <p className="text-xl font-medium">{formatCurrency(totalAssets)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Net Worth</p>
          <p className="text-xl font-medium">{formatCurrency(netWorth)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Monthly Cash Flow</p>
          <p className="text-xl font-medium">{formatCurrency(monthlyCashFlow)}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default FinancialOverviewWidget;
