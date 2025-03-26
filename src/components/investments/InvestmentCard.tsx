
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Investment } from '@/utils/localStorage';

interface InvestmentCardProps {
  investment: Investment;
  delay?: number;
}

const InvestmentCard = ({ investment, delay = 0 }: InvestmentCardProps) => {
  // Risk level indicator colors
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-soft-emerald/20 text-soft-emerald';
      case 'Medium':
        return 'bg-soft-gold/20 text-soft-gold';
      case 'High':
        return 'bg-muted-red/20 text-muted-red';
      default:
        return 'bg-subtle-gray/20 text-deep-charcoal/70';
    }
  };

  return (
    <GlassCard 
      className="h-full animate-slide-in" 
      hoverEffect={true}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-xl text-deep-charcoal">{investment.name}</h3>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-xs bg-subtle-gray/20 text-deep-charcoal/70 px-2 py-1 rounded-full">
              {investment.type}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(investment.riskLevel)}`}>
              {investment.riskLevel} Risk
            </span>
          </div>
        </div>
        <div className="bg-soft-emerald/10 rounded-full px-3 py-1">
          <span className="text-soft-emerald font-medium text-lg">
            {investment.returnRate}%
          </span>
        </div>
      </div>
      
      <p className="text-deep-charcoal/70 mt-4 text-sm line-clamp-3">
        {investment.description}
      </p>
      
      <div className="mt-6 flex gap-3">
        <button className="gold-btn-small">
          Invest Now
        </button>
        <button className="border border-subtle-gray text-deep-charcoal/80 font-medium px-4 py-2 text-sm rounded-md hover:bg-subtle-gray/10 transition-all duration-300">
          Learn More
        </button>
      </div>
    </GlassCard>
  );
};

export default InvestmentCard;
