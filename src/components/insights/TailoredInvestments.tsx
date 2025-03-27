import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react'; // Example icon

// Placeholder data for the chart
const investmentGrowthData = [
  { name: 'Jan', growth: 1000 },
  { name: 'Feb', growth: 1200 },
  { name: 'Mar', growth: 1150 },
  { name: 'Apr', growth: 1300 },
  { name: 'May', growth: 1450 },
  { name: 'Jun', growth: 1600 },
];

const TailoredInvestments = () => {
  // Placeholder strategy based on hypothetical moderate risk
  const strategy = {
    riskProfile: 'Moderate',
    suggestions: [
      'Allocate 40% to diversified ETFs (e.g., VTI, VXUS).',
      'Consider 30% in growth stocks with strong fundamentals.',
      'Maintain 20% in bonds for stability (e.g., BND).',
      'Keep 10% in cash or high-yield savings for liquidity.',
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tailored Investment Strategies</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">Based on your <span className="font-semibold">{strategy.riskProfile}</span> risk profile:</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mb-4">
          {strategy.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
        <p className="text-gray-600 mb-2 text-sm font-medium">Potential Growth Projection:</p>
        <div className="h-40"> {/* Added height container for chart */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={investmentGrowthData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }} // Adjusted margins
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="growth" stroke="#8884d8" strokeWidth={2} dot={false} name="Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TailoredInvestments;
