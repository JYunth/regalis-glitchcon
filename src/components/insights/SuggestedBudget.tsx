import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const placeholderBudgetData = [
  { name: 'Dining', current: 650, suggested: 500 },
  { name: 'Shopping', current: 920, suggested: 750 },
  { name: 'Transport', current: 210, suggested: 250 },
  { name: 'Entertainment', current: 480, suggested: 400 },
  { name: 'Groceries', current: 520, suggested: 600 },
];

const SuggestedBudget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Suggested Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Based on your spending, here's a suggested budget to help you save more:</p>
        <div className="h-60"> {/* Added height container for chart */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={placeholderBudgetData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="current" fill="#8884d8" name="Current Spending" />
              <Bar dataKey="suggested" fill="#82ca9d" name="Suggested Budget" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedBudget;
