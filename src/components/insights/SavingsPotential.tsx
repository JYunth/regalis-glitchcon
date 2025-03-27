import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react'; // Example icon

const SavingsPotential = () => {
  // Placeholder savings potentials
  const potentials = [
    { id: 1, area: 'Subscriptions', potential: '$25/month', description: 'Review unused streaming/app subscriptions.' },
    { id: 2, area: 'Dining Out', potential: '$50/month', description: 'Consider packing lunch twice a week.' },
    { id: 3, area: 'Energy Bill', potential: '$15/month', description: 'Switch to LED bulbs and unplug unused electronics.' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Potential Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Areas where you could potentially cut costs:</p>
        <ul className="space-y-3">
          {potentials.map(potential => (
            <li key={potential.id} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">{potential.area}:</span>
                <span className="text-green-600 font-semibold ml-1">{potential.potential}</span>
                <p className="text-sm text-gray-500">{potential.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SavingsPotential;
