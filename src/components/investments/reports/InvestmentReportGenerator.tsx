import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { InvestmentReport } from '@/types/investments'; // Import relevant types
import { FileText, Download } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';

interface InvestmentReportGeneratorProps {
  latestReport?: InvestmentReport; // Optional: Pass latest report summary
  isLoading: boolean;
}

// Mock Data (Replace with actual data fetching/generation logic)
const mockLatestReport: InvestmentReport = {
  id: 'report-mar-2025',
  period: 'March 2025',
  generatedDate: '2025-04-01',
  portfolioSnapshot: { /* Include mock portfolio data */ totalValue: 85000, holdings: [], assetAllocation: {}, recentPerformance: 1.5 },
  performanceAnalysis: 'Portfolio showed modest growth in March, driven by ETF performance. Crypto assets remained volatile.',
  growthPrediction: 'Continued moderate growth expected, potential upside in tech sector.',
  aiSuggestions: ['Consider increasing allocation to Global Tech Leaders ETF.', 'Review high-yield savings options.'],
};

const InvestmentReportGenerator: React.FC<InvestmentReportGeneratorProps> = ({ 
  latestReport = mockLatestReport, // Use mock data for now
  isLoading 
}) => {

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  const handleGenerateReport = () => {
    // TODO: Implement logic to trigger report generation (likely backend call)
    console.log('Triggering report generation...');
    // Show notification or update state
  };

  const handleDownloadReport = () => {
     // TODO: Implement logic to download the latest report (PDF/CSV?)
     console.log('Triggering report download...');
  };

  return (
    <GlassCard className="p-6">
       <div className="flex justify-between items-center mb-4">
         <h3 className="font-serif text-xl text-deep-charcoal flex items-center">
           <FileText className="h-5 w-5 mr-2" /> Investment Reports
         </h3>
         <Button onClick={handleGenerateReport} size="sm">
           Generate New Report
         </Button>
       </div>

      {/* TODO: Implement ReportSummaryDisplay sub-component */}
      {latestReport ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-deep-charcoal">
            Latest Report: {latestReport.period} (Generated: {new Date(latestReport.generatedDate).toLocaleDateString()})
          </p>
          <div className="p-3 border border-subtle-gray/40 rounded-md bg-white/40 text-sm space-y-1">
             <p><span className="font-semibold">Performance:</span> {latestReport.performanceAnalysis}</p>
             <p><span className="font-semibold">Outlook:</span> {latestReport.growthPrediction}</p>
             <p><span className="font-semibold">Suggestions:</span> {latestReport.aiSuggestions.join(' ')}</p>
          </div>
           <Button onClick={handleDownloadReport} variant="outline" size="sm">
             <Download className="h-4 w-4 mr-1" /> Download Full Report
           </Button>
        </div>
      ) : (
        <p className="text-sm text-deep-charcoal/70 text-center py-4">No reports generated yet.</p>
      )}
    </GlassCard>
  );
};

export default InvestmentReportGenerator;
