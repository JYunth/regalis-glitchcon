import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InvestmentPerformanceTrackerProps {
  userFinancialProfile: UserFinancialProfile;
}

const InvestmentPerformanceTracker: React.FC<InvestmentPerformanceTrackerProps> = ({ userFinancialProfile }) => {
  // Mock data for investment performance over time
  const data = [
    { name: 'Jan', investmentValue: 4000 },
    { name: 'Feb', investmentValue: 3000 },
    { name: 'Mar', investmentValue: 2000 },
    { name: 'Apr', investmentValue: 2780 },
    { name: 'May', investmentValue: 1890 },
    { name: 'Jun', investmentValue: 2390 },
    { name: 'Jul', investmentValue: 3490 },
  ];

  return (
    <GlassCard className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Investment Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="investmentValue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

export default InvestmentPerformanceTracker;
