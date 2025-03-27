import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb } from 'lucide-react'; // Example icon

interface IdleMoneySuggestionsProps {
  idleCashAmount: number; // Amount passed from parent
  isLoading: boolean;
  // suggestions?: string[]; // Future prop for actual AI suggestions
}

const IdleMoneySuggestions: React.FC<IdleMoneySuggestionsProps> = ({ idleCashAmount, isLoading }) => {
  // Don't render if amount is zero or less, or if loading
  if (isLoading || idleCashAmount <= 0) {
    // Optionally return a skeleton if loading state needs visual representation here
    // return isLoading ? <Skeleton className="h-10 w-full" /> : null;
    return null; 
  }

  // Format currency (consider moving to a util function)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Placeholder suggestion using the passed amount
  const placeholderSuggestion = `Consider investing your idle ${formatCurrency(idleCashAmount)} in a diversified ETF or a high-yield savings account for potential growth.`;

  return (
    <div className="mt-4 pt-4 border-t border-subtle-gray/50 flex items-start space-x-3">
      <Lightbulb className="h-5 w-5 text-soft-gold flex-shrink-0 mt-1" />
      <div>
        <p className="text-sm font-medium text-deep-charcoal">AI Suggestion</p>
        <p className="text-sm text-deep-charcoal/80">
          {placeholderSuggestion}
          {/* TODO: Replace with actual AI suggestions when available */}
        </p>
      </div>
    </div>
  );
};

export default IdleMoneySuggestions;
