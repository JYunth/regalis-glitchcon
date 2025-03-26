import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SpendingBreakdownChartProps {
  userFinancialProfile: UserFinancialProfile;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const SpendingBreakdownChart: React.FC<SpendingBreakdownChartProps> = ({ userFinancialProfile }) => {
  const data = Object.entries(userFinancialProfile.expenseBudgets).map(([name, value]) => ({ name, value }));

  return (
    <GlassCard className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

export default SpendingBreakdownChart;
