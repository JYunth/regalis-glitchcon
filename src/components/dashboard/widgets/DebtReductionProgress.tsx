import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';
import { Progress } from '@/components/ui/progress';

interface DebtReductionProgressProps {
  userFinancialProfile: UserFinancialProfile;
}

const DebtReductionProgress: React.FC<DebtReductionProgressProps> = ({ userFinancialProfile }) => {
  const totalDebt = userFinancialProfile.liabilities.reduce((sum, liability) => sum + liability.balance, 0);
  const initialDebt = 10000; // Replace with the user's initial debt value
  const remainingDebt = totalDebt; // Assuming no debt reduction yet
  const progress = ((initialDebt - remainingDebt) / initialDebt) * 100;

  return (
    <GlassCard className="w-full">
      <h3 className="text-lg font-semibold mb-4">Debt Reduction Progress</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Total Debt: ${totalDebt}</p>
        <Progress value={progress} />
        <p className="text-sm text-gray-500">Remaining Debt: ${remainingDebt}</p>
      </div>
    </GlassCard>
  );
};

export default DebtReductionProgress;
