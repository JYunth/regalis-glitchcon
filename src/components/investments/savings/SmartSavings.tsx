import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { SavingsProduct, PassiveIncomeSource } from '@/types/investments'; // Import relevant types

interface SmartSavingsProps {
  savingsProducts?: SavingsProduct[];
  passiveIncomeSources?: PassiveIncomeSource[];
  isLoading: boolean;
}

// Mock Data (Replace with actual data fetching)
const mockSavings: SavingsProduct[] = [
  { id: 'sav-01', provider: 'Digital Bank Plus', productName: 'MaxiSave Account', apy: 4.5, type: 'SavingsAccount', minimumBalance: 0 },
  { id: 'sav-02', provider: 'Secure Trust', productName: '1-Year Fixed Deposit', apy: 5.1, type: 'FixedDeposit', minimumBalance: 1000 },
];

const mockPassive: PassiveIncomeSource[] = [
  { id: 'pas-01', type: 'DividendStock', name: 'Utility Co. (UTIL)', potentialReturn: 'Est. 4% yield', riskLevel: 'Low', description: 'Stable utility company with consistent dividends.' },
  { id: 'pas-02', type: 'REIT', name: 'Commercial Property REIT (CPREIT)', potentialReturn: 'Est. 6% yield', riskLevel: 'Medium', description: 'Diversified portfolio of commercial real estate.' },
];

const SmartSavings: React.FC<SmartSavingsProps> = ({ 
  savingsProducts = mockSavings, 
  passiveIncomeSources = mockPassive, 
  isLoading 
}) => {

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  return (
    <GlassCard className="p-6">
      <h3 className="font-serif text-xl text-deep-charcoal mb-4">Savings & Passive Income</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* High-Yield Savings Section */}
        <div>
          <h4 className="font-semibold text-deep-charcoal mb-2">High-Yield Opportunities</h4>
          {/* TODO: Implement HighYieldAccountsList sub-component */}
          <div className="space-y-2">
            {savingsProducts && savingsProducts.length > 0 ? (
              savingsProducts.map(product => (
                <div key={product.id} className="p-3 border border-subtle-gray/40 rounded-md bg-white/40 text-sm">
                  <p className="font-medium">{product.productName} ({product.provider})</p>
                  <p className="text-deep-charcoal/80">APY: <span className="font-semibold text-soft-emerald">{product.apy}%</span> ({product.type})</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-deep-charcoal/70">No high-yield savings suggestions available.</p>
            )}
          </div>
        </div>

        {/* Passive Income Section */}
        <div>
          <h4 className="font-semibold text-deep-charcoal mb-2">Passive Income Ideas</h4>
          {/* TODO: Implement PassiveIncomeIdeas sub-component */}
           <div className="space-y-2">
            {passiveIncomeSources && passiveIncomeSources.length > 0 ? (
              passiveIncomeSources.map(source => (
                <div key={source.id} className="p-3 border border-subtle-gray/40 rounded-md bg-white/40 text-sm">
                  <p className="font-medium">{source.name} ({source.type})</p>
                  <p className="text-deep-charcoal/80">Return: {source.potentialReturn} (Risk: {source.riskLevel})</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-deep-charcoal/70">No passive income suggestions available.</p>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default SmartSavings;
