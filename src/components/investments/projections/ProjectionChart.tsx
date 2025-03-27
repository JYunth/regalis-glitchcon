import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectionDataPoint } from '@/types/investments';

interface ProjectionChartProps {
  data?: ProjectionDataPoint[];
  isLoading: boolean;
}

// Format currency (consider moving to utils)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Custom tooltip (similar to the original)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 text-sm">
        <p className="font-medium">Year {label}</p> {/* Assuming label is the date/year */}
        <p className="text-soft-gold font-serif text-lg">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-deep-charcoal/50">No projection data available.</div>;
  }

  return (
    <div className="h-64"> {/* Ensure container has height */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#DADADA" opacity={0.3} />
          <XAxis dataKey="date" tick={{ fill: '#2D2D2D', opacity: 0.7, fontSize: 12 }} />
          <YAxis 
            tickFormatter={(value) => `$${value/1000}k`} 
            tick={{ fill: '#2D2D2D', opacity: 0.7, fontSize: 12 }}
            domain={['auto', 'auto']} // Adjust domain if needed
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#E4CDA7" // Soft Gold color
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#E4CDA7' }}
          />
          {/* TODO: Add lines for different scenarios if needed */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;
