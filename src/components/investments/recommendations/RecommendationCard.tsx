import React from 'react';
import { InvestmentRecommendation } from '@/types/investments';
import { Button } from '@/components/ui/button'; // Assuming button component exists
import { Info } from 'lucide-react'; // Example icon

interface RecommendationCardProps {
  recommendation: InvestmentRecommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  // Correctly destructure product, reasoning, suggestedAllocation
  // riskLevel is accessed via product.riskLevel
  const { product, reasoning, suggestedAllocation } = recommendation; 

  // Determine risk color - consider moving this logic to utils or constants
  const getRiskColorClasses = (level: 'Low' | 'Medium' | 'High' | 'Very High') => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800'; // Example for High
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 border border-subtle-gray/50 rounded-lg bg-white/50 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-deep-charcoal">{product.name}</h4>
          <p className="text-xs text-deep-charcoal/60">{product.category}{product.tickerSymbol ? ` (${product.tickerSymbol})` : ''}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskColorClasses(product.riskLevel)}`}>
          {product.riskLevel} Risk 
        </span>
      </div>
      
      <p className="text-sm text-deep-charcoal/80 mb-3">{reasoning}</p>
      
      {product.description && (
         <p className="text-xs text-deep-charcoal/60 mb-3">{product.description}</p>
      )}

      <div className="flex justify-between items-center text-sm">
        {suggestedAllocation && (
          <span className="text-deep-charcoal/90">Suggested Allocation: <span className="font-medium">{suggestedAllocation}%</span></span>
        )}
        {/* TODO: Add action buttons like 'Learn More' or 'Invest' */}
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
