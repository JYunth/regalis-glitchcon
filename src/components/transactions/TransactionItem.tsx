import React from 'react';
import { Transaction } from '@/utils/localStorage';
import { IncomeSource } from '@/pages/Onboarding'; // Assuming this path is correct based on previous steps
import { Badge } from '@/components/ui/badge';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TransactionItemProps {
  transaction: Transaction;
  // Pass incomeSources and expenseBudgets if needed for more complex category logic later
  // incomeSources: IncomeSource[];
  // expenseBudgets: { [category: string]: number };
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isProfit = transaction.amount > 0;
  const currencyFormatter = new Intl.NumberFormat('en-US', { // Basic currency formatting, adjust locale/options as needed
    style: 'currency',
    currency: 'USD', // TODO: Ideally get currency from user settings
  });

  return (
    <div className="flex items-center border p-4 rounded-md mb-2 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Icon */}
      <div className="mr-3 flex-shrink-0">
        {isProfit ? (
          <ArrowUpCircle className="h-6 w-6 text-green-500" />
        ) : (
          <ArrowDownCircle className="h-6 w-6 text-red-500" />
        )}
      </div>

      {/* Main Content - Using Flexbox for better control */}
      <div className="flex-grow flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
        {/* Left Side: Title & Date */}
        <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex item overflow */}
          <h3 className="text-base font-semibold truncate" title={transaction.description}>
            {transaction.description}
          </h3>
          <p className="text-xs text-muted-foreground">
            {format(new Date(transaction.date), "MMM dd, yyyy 'at' hh:mm a")}
          </p>
        </div>

        {/* Right Side: Amount & Category */}
        <div className="flex flex-col md:flex-row items-end md:items-center gap-x-4 gap-y-1 w-full md:w-auto">
          {/* Amount */}
          <div className="text-right md:text-center min-w-[80px]"> {/* Give amount a min-width */}
            <p className={cn(
               "text-lg font-bold", // Slightly larger amount
               isProfit ? "text-green-600" : "text-red-600"
             )}>
              {isProfit ? '+' : '-'}{currencyFormatter.format(Math.abs(transaction.amount)).replace('$', '')} {/* Show sign, format */}
            </p>
          </div>

          {/* Category Tag */}
          <div className="text-right min-w-[100px]"> {/* Give badge container a min-width */}
            {transaction.category && (
              <Badge variant="outline" className="whitespace-nowrap text-xs"> {/* Ensure badge text is small */}
                {transaction.category}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
