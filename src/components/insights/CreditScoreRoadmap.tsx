import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckSquare, TrendingUp } from 'lucide-react'; // Example icons

const CreditScoreRoadmap = () => {
  // Placeholder roadmap steps
  const roadmapSteps = [
    { id: 1, action: 'Pay all bills on time', status: 'Completed', detail: 'Maintain a perfect payment history.' },
    { id: 2, action: 'Reduce credit card balances', status: 'In Progress', detail: 'Aim for below 30% utilization.' },
    { id: 3, action: 'Avoid opening too many new accounts', status: 'Active', detail: 'Limit hard inquiries on your report.' },
    { id: 4, action: 'Dispute inaccuracies on your credit report', status: 'Recommended', detail: 'Regularly check your report for errors.' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Score Improvement Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Actionable steps to improve your credit score:</p>
        <ul className="space-y-3">
          {roadmapSteps.map(step => (
            <li key={step.id} className="flex items-start">
              {step.status === 'Completed' ? (
                <CheckSquare className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <span className="font-medium">{step.action}</span>
                <span className={`text-xs ml-2 px-1.5 py-0.5 rounded ${step.status === 'Completed' ? 'bg-green-100 text-green-700' : step.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                  {step.status}
                </span>
                <p className="text-sm text-gray-500">{step.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CreditScoreRoadmap;
