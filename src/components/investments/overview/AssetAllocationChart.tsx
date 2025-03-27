import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface AllocationData {
  name: string;
  value: number;
}

interface AssetAllocationChartProps {
  data?: { [category: string]: number }; // e.g., { Stocks: 40, Crypto: 20, ... }
  isLoading: boolean;
}

// Define colors for chart segments (adjust as needed)
const COLORS = ['#E4CDA7', '#B8A98F', '#8C8477', '#605F5F', '#343A40', '#ADB5BD'];

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <Skeleton className="h-40 w-40 rounded-full mx-auto" />; // Placeholder for loading chart
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center text-sm text-deep-charcoal/70">No allocation data available.</div>;
  }

  const chartData: AllocationData[] = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  const CustomTooltipContent = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-2 text-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 160 }}> {/* Adjust height as needed */}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Optional: Add labels
            outerRadius={80} // Adjust size
            innerRadius={40} // Make it a donut chart
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltipContent />} />
          {/* TODO: Consider adding a Legend */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetAllocationChart;
