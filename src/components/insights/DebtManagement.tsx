import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Using Badge for debt types
import { Target } from 'lucide-react'; // Example icon

const DebtManagement = () => {
  // Placeholder debt insights
  const debts = [
    { id: 1, type: 'Credit Card', interest: '18.9%', balance: '$4,500', suggestion: 'Prioritize paying this off (Avalanche Method).' },
    { id: 2, type: 'Student Loan', interest: '5.5%', balance: '$22,000', suggestion: 'Consider refinancing for a lower rate.' },
    { id: 3, type: 'Personal Loan', interest: '9.2%', balance: '$8,000', suggestion: 'Explore consolidation options.' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Management Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">AI analysis of your debts and potential strategies:</p>
        <ul className="space-y-4">
          {debts.map(debt => (
            <li key={debt.id} className="flex items-start border-b pb-3 last:border-b-0 last:pb-0">
              <Target className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="flex items-center mb-1">
                  <Badge variant="destructive" className="mr-2">{debt.type}</Badge>
                  <span className="text-sm font-semibold text-red-600">{debt.interest} Interest</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">Balance: <span className="font-medium">{debt.balance}</span></p>
                <p className="text-sm text-blue-600">{debt.suggestion}</p>
              </div>
            </li>
          ))}
        </ul>
         {/* Add consolidation/repayment plan links/buttons here */}
      </CardContent>
    </Card>
  );
};

export default DebtManagement;
