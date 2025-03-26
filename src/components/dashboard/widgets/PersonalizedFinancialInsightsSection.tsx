import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';

interface PersonalizedFinancialInsightsSectionProps {
  userFinancialProfile: UserFinancialProfile;
}

const PersonalizedFinancialInsightsSection: React.FC<PersonalizedFinancialInsightsSectionProps> = ({ userFinancialProfile }) => {
  // Implement logic to generate personalized financial insights based on user data
  const insights = [
    "Consider increasing your contributions to your retirement account.",
    "You're doing great with your budgeting! Keep it up.",
    "Explore options for consolidating your debt to lower interest rates.",
  ];

  return (
    <GlassCard className="w-full">
      <h3 className="text-lg font-semibold mb-4">Personalized Financial Insights</h3>
      <ul className="list-disc pl-5">
        {insights.map((insight, index) => (
          <li key={index} className="text-sm text-gray-700 mb-2">{insight}</li>
        ))}
      </ul>
    </GlassCard>
  );
};

export default PersonalizedFinancialInsightsSection;
