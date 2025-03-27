import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';
// Added Tooltip and Legend imports
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'; 

interface SpendingBreakdownChartProps {
  userFinancialProfile: UserFinancialProfile;
}

// TODO: Define themed chart colors in tailwind config and import/use them here
const COLORS = ['#88A0A8', '#A3C9A8', '#E4CDA7', '#D87C7C', '#B0A8B9', '#97C1A9', '#F0B7A4', '#F2B6C1']; // Using planned themed colors

// Renamed component (Step D.1)
const BudgetAllocationChart: React.FC<SpendingBreakdownChartProps> = ({ userFinancialProfile }) => { 
  // Data source is budget, not actual spending
  const data = Object.entries(userFinancialProfile.expenseBudgets).map(([name, value]) => ({ name, value }));
  const totalBudget = data.reduce((sum, entry) => sum + entry.value, 0);

  // Basic currency formatting (assuming USD for now, ideally get from settings)
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: userFinancialProfile.settings?.currency ?? 'USD' }).format(amount);

  return (
    // Removed fixed height h-80 (Step D.1)
    <GlassCard className="w-full"> 
      {/* Updated title (Step D.1) */}
      <h3 className="text-lg font-semibold mb-1">Budget Allocation</h3> 
      <p className="text-sm text-gray-600 mb-4">Total Budget: {formatCurrency(totalBudget)}</p>
      {/* Set explicit height on container (Step D.1) */}
      <ResponsiveContainer width="100%" height={250}> 
        <PieChart>
          {/* Added innerRadius for Donut shape (Step D.1) */}
          <Pie 
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false} // Often cleaner for donut charts
            // Adjusted radii (Step D.1)
            innerRadius={60} 
            outerRadius={85} 
            fill="#8884d8" // Default fill (overridden by Cells)
            paddingAngle={2}
            dataKey="value"
            // TODO: Add custom label component for percentages
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              // Only show label if percent is large enough
              return percent > 0.05 ? ( 
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              ) : null;
            }}
            // Removed duplicated props: isAnimationActive, data, cx, cy
          >
            {
              data.map((entry, index) => (
                // Apply themed colors (Step D.1 / Phase A.3)
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          {/* Added Tooltip (Step D.1) */}
          <Tooltip 
            formatter={(value: number, name: string) => [`${formatCurrency(value)} (${(value / totalBudget * 100).toFixed(1)}%)`, name]}
            cursor={{ fill: 'rgba(218, 218, 218, 0.2)' }} // Use subtle-gray with transparency
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', // Use theme background
              borderColor: 'hsl(var(--border))', // Use theme border
              borderRadius: 'var(--radius)',
              fontSize: '0.875rem', // text-sm
              color: 'hsl(var(--foreground))' // Use theme foreground
            }}
          />
          {/* Added Legend (Step D.1) */}
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '0.875rem', color: 'hsl(var(--foreground))' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

// Updated export name (Step D.1)
export default BudgetAllocationChart;
