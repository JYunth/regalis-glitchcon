import React from 'react';
import { UserInvestmentProfile } from '@/types/investments';
import { Badge } from '@/components/ui/badge'; // Assuming badge component exists

interface RiskProfileInfoProps {
  userProfile?: UserInvestmentProfile;
}

const RiskProfileInfo: React.FC<RiskProfileInfoProps> = ({ userProfile }) => {
  if (!userProfile?.riskTolerance) {
    return null; // Don't render if risk tolerance is not available
  }

  // Determine badge variant based on risk tolerance (customize colors/styles as needed)
  const getBadgeVariant = (tolerance: 'Conservative' | 'Balanced' | 'Aggressive'): "default" | "secondary" | "destructive" | "outline" => {
    switch (tolerance) {
      case 'Conservative': return 'secondary'; // Example mapping
      case 'Balanced': return 'default';
      case 'Aggressive': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="mb-4 p-3 bg-soft-gold/10 rounded-md flex items-center justify-between">
      <p className="text-sm text-deep-charcoal/80">
        Recommendations based on your risk profile:
      </p>
      <Badge variant={getBadgeVariant(userProfile.riskTolerance)}>
        {userProfile.riskTolerance}
      </Badge>
      {/* TODO: Add link/button to update risk profile in Settings */}
    </div>
  );
};

export default RiskProfileInfo;
