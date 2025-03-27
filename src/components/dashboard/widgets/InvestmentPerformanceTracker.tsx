import React, { useState, useMemo } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { UserFinancialProfile } from '@/utils/localStorage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// TODO: Import and use date-fns for robust date formatting
// import { format, parseISO } from 'date-fns'; 

interface InvestmentPerformanceTrackerProps {
  userFinancialProfile: UserFinancialProfile;
}

// Define TimeRange type
type TimeRange = '1M' | '6M' | '1Y' | 'MAX';

const InvestmentPerformanceTracker: React.FC<InvestmentPerformanceTrackerProps> = ({ userFinancialProfile }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y'); // State for time range selector

  // Memoize filtered data calculation
  const filteredData = useMemo(() => {
    const history = userFinancialProfile.portfolioHistory || [];
    if (history.length === 0) return [];

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '1M':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // Basic fallback
        break;
      case '6M':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()); // Basic fallback
        break;
      case '1Y':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Basic fallback
        break;
      case 'MAX':
      default:
        startDate = new Date(0); // Start from the beginning of time
        break;
    }
    
    // Filter history based on startDate
    return history.filter(entry => new Date(entry.timestamp) >= startDate); 

  }, [userFinancialProfile.portfolioHistory, timeRange]);

  // Map filtered data for the chart
  const chartData = useMemo(() => {
    return filteredData.map(entry => ({
      name: entry.timestamp, // Use timestamp as 'name' for XAxis key
      investmentValue: entry.totalValue 
    }));
  }, [filteredData]);

  // Calculate gain/loss context
  const gainLoss = useMemo(() => {
    if (chartData.length < 2) return { absolute: 0, percentage: 0 };
    const startValue = chartData[0].investmentValue;
    const endValue = chartData[chartData.length - 1].investmentValue;
    const absolute = endValue - startValue;
    const percentage = startValue === 0 ? 0 : (absolute / startValue) * 100;
    return { absolute, percentage };
  }, [chartData]);

  // Currency formatting - remove decimals for cleaner chart axis/tooltip
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: userFinancialProfile.settings?.currency ?? 'USD', maximumFractionDigits: 0 }).format(amount);
  const formatCurrencyWithDecimals = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: userFinancialProfile.settings?.currency ?? 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);


  // Y-Axis Currency Formatter
  const formatYAxis = (tickItem: number) => {
    if (Math.abs(tickItem) >= 1000000) return `$${(tickItem / 1000000).toFixed(1)}M`;
    if (Math.abs(tickItem) >= 1000) return `$${(tickItem / 1000).toFixed(0)}k`;
    return formatCurrency(tickItem);
  };

  // X-Axis Date Formatter - Basic version
  const formatXAxis = (tickItem: string) => {
    try {
      const date = new Date(tickItem); 
      if (isNaN(date.getTime())) return ''; 

      if (timeRange === '1M') {
        return `${date.getMonth() + 1}/${date.getDate()}`; // MM/DD
      } else if (timeRange === '6M' || timeRange === '1Y') {
        return date.toLocaleString('default', { month: 'short' }); // Jan, Feb etc.
      } else { // MAX
        return `'${date.getFullYear().toString().slice(-2)}`; // 'YY
      }
    } catch (e) {
      console.error("Error formatting date:", tickItem, e);
      return ''; 
    }
  };

  // Hardcoded theme colors (fallback)
  const chartColors = {
    blue: '#88A0A8',
    green: '#A3C9A8',
    yellow: '#E4CDA7',
    red: '#D87C7C',
    purple: '#B0A8B9',
    teal: '#97C1A9',
    orange: '#F0B7A4',
    pink: '#F2B6C1',
    border: '#E4CDA7', // soft-gold
    mutedForeground: '#6b7280', // gray-500/600
    background: '#F7F5F2', // warm-beige
    foreground: '#2D2D2D' // deep-charcoal
  };


  return (
    <GlassCard className="w-full"> 
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Investment Performance</h3>
        <ToggleGroup 
          type="single" 
          defaultValue="1Y" 
          value={timeRange} 
          onValueChange={(value: TimeRange) => { if (value) setTimeRange(value); }}
          size="sm"
        >
          <ToggleGroupItem value="1M" aria-label="1 Month">1M</ToggleGroupItem>
          <ToggleGroupItem value="6M" aria-label="6 Months">6M</ToggleGroupItem>
          <ToggleGroupItem value="1Y" aria-label="1 Year">1Y</ToggleGroupItem>
          <ToggleGroupItem value="MAX" aria-label="Maximum">MAX</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {chartData.length > 0 ? (
          <>
            <span className={gainLoss.absolute >= 0 ? 'text-soft-emerald' : 'text-muted-red'}>
              {gainLoss.absolute >= 0 ? '+' : ''}{formatCurrencyWithDecimals(gainLoss.absolute)} ({gainLoss.percentage.toFixed(1)}%)
            </span>
            <span className="ml-2">({timeRange})</span>
          </>
        ) : (
          <span>No performance data available for selected range.</span>
        )}
      </p>
      <ResponsiveContainer width="100%" height={250}> 
        {chartData.length > 0 ? (
          <LineChart
            data={chartData} 
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }} // Adjusted margins
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} strokeOpacity={0.5} /> 
            <XAxis 
              dataKey="name" 
              stroke={chartColors.mutedForeground} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={formatXAxis} 
            />
            <YAxis 
              stroke={chartColors.mutedForeground} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={formatYAxis} 
              width={60} // Adjusted width
            />
            <Tooltip 
              cursor={{ fill: 'rgba(218, 218, 218, 0.2)' }} // subtle-gray/20
              contentStyle={{
                backgroundColor: chartColors.background,
                borderColor: chartColors.border,
                borderRadius: '0.75rem', // --radius
                fontSize: '0.875rem', // text-sm
                color: chartColors.foreground,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' // shadow-glass
              }}
              labelFormatter={(label) => { 
                try { return new Date(label).toLocaleDateString(); } catch { return label; }
              }}
              // Use formatCurrencyWithDecimals for tooltip precision
              formatter={(value: number) => [formatCurrencyWithDecimals(value), "Value"]} 
            />
            {/* Legend might be redundant for single line, consider removing */}
            {/* <Legend wrapperStyle={{ fontSize: '0.875rem', color: chartColors.foreground }} />  */}
            <Line 
              type="monotone" 
              dataKey="investmentValue" 
              stroke={chartColors.blue} 
              strokeWidth={2} 
              activeDot={{ r: 6, fill: chartColors.blue }} 
              dot={false} 
            />
          </LineChart>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No data</div>
        )}
      </ResponsiveContainer>
    </GlassCard>
  );
};

export default InvestmentPerformanceTracker;
