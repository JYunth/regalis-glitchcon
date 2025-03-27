import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { InvestmentRecommendation, UserInvestmentProfile } from '@/types/investments'; // Import relevant types
import RecommendationCard from './RecommendationCard'; // Import the card component
import RiskProfileInfo from './RiskProfileInfo'; // Import the risk profile component
import SmartRebalancingSection from './SmartRebalancingSection'; // Import the rebalancing component

interface InvestmentRecommendationsProps {
  recommendations?: InvestmentRecommendation[];
  userProfile?: UserInvestmentProfile;
  isLoading: boolean;
}

// Mock data for recommendations (replace with actual data fetching/AI logic)
const mockRecommendations: InvestmentRecommendation[] = [
  {
    id: 'rec-001',
    product: {
      id: 'prod-etf-01',
      name: 'Global Tech Leaders ETF',
      category: 'ETF',
      tickerSymbol: 'TECHG',
      expectedReturn: 12,
      riskLevel: 'Medium',
      description: 'Exposure to leading technology companies worldwide.'
    },
    reasoning: 'Based on your balanced risk profile and market trends indicating growth in the tech sector.',
    suggestedAllocation: 15, // Percentage
    timestamp: new Date().toISOString(),
  },
  {
    id: 'rec-002',
    product: {
      id: 'prod-bond-01',
      name: 'Corporate Bond Fund - AAA',
      category: 'Bond',
      expectedReturn: 4.5,
      riskLevel: 'Low',
      description: 'Stable returns from high-quality corporate bonds.'
    },
    reasoning: 'Provides stability to your portfolio, complementing higher-risk assets.',
    suggestedAllocation: 20,
    timestamp: new Date().toISOString(),
  },
];

const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({ 
  recommendations = mockRecommendations, // Use mock data as default for now
  userProfile, 
  isLoading 
}) => {

  if (isLoading) {
    // Skeleton for the entire recommendations section
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return <GlassCard>No investment recommendations available at this time.</GlassCard>;
  }

  return (
    <GlassCard className="p-6">
      {/* Render RiskProfileInfo component */}
      <RiskProfileInfo userProfile={userProfile} />

      <h3 className="font-serif text-xl text-deep-charcoal mb-4">AI-Powered Suggestions</h3>
      
      <div className="space-y-4">
        {/* Render RecommendationCard for each recommendation */}
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>

      {/* Render SmartRebalancingSection component */}
      <SmartRebalancingSection isLoading={isLoading} />
      
    </GlassCard>
  );
};

export default InvestmentRecommendations;
