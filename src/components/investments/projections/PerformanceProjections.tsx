import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectionDataPoint } from '@/types/investments'; // Import relevant types
import ProjectionChart from './ProjectionChart'; // Import the chart component
import WhatIfSimulator from './WhatIfSimulator'; // Import the simulator component
import RiskRewardAnalysisDisplay from './RiskRewardAnalysisDisplay'; // Import the analysis component

interface PerformanceProjectionsProps {
  projectionData?: ProjectionDataPoint[]; // AI-predicted data
  isLoading: boolean;
}

// Mock data for projections (replace with actual data fetching/AI logic)
const mockProjectionData: ProjectionDataPoint[] = [
  { date: '2025', value: 50000 },
  { date: '2026', value: 64800 },
  { date: '2027', value: 81184 },
  { date: '2028', value: 99279 },
  { date: '2029', value: 119221 },
  { date: '2030', value: 141359 },
  { date: '2031', value: 165067 },
  { date: '2032', value: 190273 },
  { date: '2033', value: 217095 },
  { date: '2034', value: 245662 },
  { date: '2035', value: 276115 },
];

const PerformanceProjections: React.FC<PerformanceProjectionsProps> = ({ 
  projectionData = mockProjectionData, // Use mock data for now
  isLoading 
}) => {

  if (isLoading) {
    // Skeleton for the entire projections section
    return <Skeleton className="h-64 w-full" />;
  }

  if (!projectionData || projectionData.length === 0) {
    return <GlassCard>No projection data available.</GlassCard>;
  }

  return (
    <GlassCard className="p-6">
      <h3 className="font-serif text-xl text-deep-charcoal mb-4">Growth Projections & Simulations</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Projection Chart */}
        <div>
          <h4 className="font-semibold text-deep-charcoal mb-2">Projected Portfolio Value</h4>
          <ProjectionChart data={projectionData} isLoading={isLoading} />
        </div>

        {/* Section 2: What If Simulator & Risk/Reward */}
        <div className="space-y-4">
          {/* Render WhatIfSimulator */}
          <WhatIfSimulator isLoading={isLoading} />

          {/* Render RiskRewardAnalysisDisplay */}
          <RiskRewardAnalysisDisplay isLoading={isLoading} />
          
        </div>
      </div>
    </GlassCard>
  );
};

export default PerformanceProjections;
