import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { DebtInvestmentRatioInfo } from '@/types/investments'; // Import relevant types
import { Scale, TrendingUp, TrendingDown } from 'lucide-react'; // Example icons

interface DebtInvestmentAdvisorProps {
  debtInfo?: DebtInvestmentRatioInfo;
  isLoading: boolean;
  hasDebt: boolean; // Simple flag indicating if user has any debt
}

// Mock Data (Replace with actual data fetching/calculation)
const mockDebtInfo: DebtInvestmentRatioInfo = {
  totalDebt: 15000,
  totalInvestments: 75000,
  ratio: 0.2, // totalDebt / totalInvestments
  recommendation: 'Your debt-to-investment ratio is healthy. Focus on balanced growth while managing debt.',
};

const DebtInvestmentAdvisor: React.FC<DebtInvestmentAdvisorProps> = ({ 
  debtInfo = mockDebtInfo, // Use mock data for now
  isLoading,
  hasDebt = true // Assume user has debt for mock display
}) => {

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  // Don't render this section if the user has no debt
  if (!hasDebt) {
    return null; 
  }

  return (
    <GlassCard className="p-6">
      <h3 className="font-serif text-xl text-deep-charcoal mb-4">Debt & Investment Strategy</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pay off Debt vs Invest Recommendation */}
        <div>
          <h4 className="font-semibold text-deep-charcoal mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" /> / <TrendingDown className="h-4 w-4 mr-2 text-red-600" /> Pay Off vs. Invest
          </h4>
          {/* TODO: Implement PayoffVsInvestRecommendation sub-component */}
          <div className="p-3 border border-subtle-gray/40 rounded-md bg-white/40 text-sm">
            <p className="font-medium text-deep-charcoal/90">AI Recommendation:</p>
            <p className="text-deep-charcoal/80">
              {debtInfo?.recommendation ?? 'Analysis pending...'} (Placeholder)
            </p>
          </div>
        </div>

        {/* Debt-to-Investment Ratio */}
        <div>
           <h4 className="font-semibold text-deep-charcoal mb-2 flex items-center">
             <Scale className="h-4 w-4 mr-2 text-blue-500" /> Debt-to-Investment Ratio
           </h4>
          {/* TODO: Implement DebtInvestmentRatioCalculator sub-component */}
           <div className="p-3 border border-subtle-gray/40 rounded-md bg-white/40 text-sm">
             {debtInfo ? (
               <>
                 <p>Total Debt: ${debtInfo.totalDebt.toLocaleString()}</p>
                 <p>Total Investments: ${debtInfo.totalInvestments.toLocaleString()}</p>
                 <p className="font-semibold mt-1">Ratio: {debtInfo.ratio.toFixed(2)}</p> 
                 {/* Add interpretation based on ratio */}
               </>
             ) : (
               <p className="text-deep-charcoal/70">Calculating ratio...</p>
             )}
             {/* Add calculator inputs if needed */}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default DebtInvestmentAdvisor;
