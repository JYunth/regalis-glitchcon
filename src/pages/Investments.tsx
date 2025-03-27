import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import InvestmentCard from '@/components/investments/InvestmentCard';
import { Investment, InvestmentHolding, getUserData } from '@/utils/localStorage'; // Added InvestmentHolding
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Will be moved to specific components
import { loadDemoData } from '@/utils/demoData';
import { Skeleton } from '@/components/ui/skeleton'; // Added Skeleton import
import { Portfolio, UserInvestmentProfile, ProjectionDataPoint, DebtInvestmentRatioInfo } from '@/types/investments'; // Import relevant types (Added DebtInvestmentRatioInfo)
import PortfolioOverview from '@/components/investments/overview/PortfolioOverview'; // Import the overview component
import InvestmentRecommendations from '@/components/investments/recommendations/InvestmentRecommendations'; // Import the recommendations component
import PerformanceProjections from '@/components/investments/projections/PerformanceProjections'; // Import the projections component
import SmartSavings from '@/components/investments/savings/SmartSavings'; // Import the savings component
import DebtInvestmentAdvisor from '@/components/investments/debt/DebtInvestmentAdvisor'; // Import the debt advisor component
import InvestmentCalendar from '@/components/investments/calendar/InvestmentCalendar'; // Import the calendar component
import InvestmentReportGenerator from '@/components/investments/reports/InvestmentReportGenerator'; // Import the reports component

// TODO: Define more comprehensive types in src/types/investments.ts
// type ProjectionDataPoint = { year: string; value: number }; // Already defined in types/investments.ts

const Investments = () => {
  const [investmentSuggestions, setInvestmentSuggestions] = useState<Investment[]>([]); // Renamed state for clarity
  const [holdings, setHoldings] = useState<InvestmentHolding[]>([]); // New state for actual holdings
  // const [projectionData, setProjectionData] = useState<ProjectionDataPoint[]>([]); // Will be managed by projection component
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<Portfolio | undefined>(undefined); // State for portfolio overview data
  const [currentBalance, setCurrentBalance] = useState<number>(0); // State for current balance
  const [userProfile, setUserProfile] = useState<UserInvestmentProfile | undefined>(undefined); // State for user profile data
  const [projectionData, setProjectionData] = useState<ProjectionDataPoint[] | undefined>(undefined); // State for projection data
  const [debtInfo, setDebtInfo] = useState<DebtInvestmentRatioInfo | undefined>(undefined); // State for debt info
  const [hasDebt, setHasDebt] = useState<boolean>(false); // State to track if user has debt

  useEffect(() => {
    // Load demo data (consider moving this if data fetching becomes more complex)
    loadDemoData();

    // Simulate loading delay
    const timer = setTimeout(() => {
      const userData = getUserData();
      setInvestmentSuggestions(userData.investmentSuggestions); // Load suggestions (type Investment[])
      setHoldings(userData.investments); // Load actual holdings (type InvestmentHolding[])
      setCurrentBalance(userData.balance); // Set current balance from user data
      setHasDebt(userData.liabilities && userData.liabilities.length > 0); // Check if user has liabilities

      // --- Create Mock User Profile Data ---
      const mockUserProfile: UserInvestmentProfile = {
        riskTolerance: 'Balanced', // Example risk tolerance
        // financialSituationSummary: 'Stable income, moderate savings.', // Example summary
      };
      setUserProfile(mockUserProfile);
      // --- End Mock User Profile Data ---

      // --- Create Mock Portfolio Data ---
      // In a real app, this would involve calculation based on holdings, market data, AI, etc.
      const mockTotalValue = userData.investments.reduce((sum, h) => sum + h.value, 0) + userData.balance; // Simple sum for now
      const mockPortfolio: Portfolio = {
        totalValue: mockTotalValue,
        holdings: userData.investments,
        assetAllocation: { // Dummy allocation
          'Stocks': 45,
          'Crypto': 25,
          'ETFs': 20,
          'Cash': 10,
        },
        diversificationScore: 75, // Dummy score
        recentPerformance: 2.5, // Dummy performance
        // idleCash: userData.balance > 5000 ? userData.balance : undefined, // Removed: Will be handled separately
      };
      setPortfolioData(mockPortfolio);
      // --- End Mock Data ---

      // --- Create Mock Projection Data ---
      // In a real app, this would come from an AI model/backend
       const mockProjectionDataPoints: ProjectionDataPoint[] = [
         { date: '2025', value: mockTotalValue }, // Start with current value
         { date: '2026', value: mockTotalValue * 1.08 + 10000 }, // Example simple projection
         { date: '2027', value: (mockTotalValue * 1.08 + 10000) * 1.08 + 10000 },
         // ... add more points
       ];
       setProjectionData(mockProjectionDataPoints);
      // --- End Mock Projection Data ---

      // --- Create Mock Debt Info Data ---
      if (userData.liabilities && userData.liabilities.length > 0) {
        const totalDebt = userData.liabilities.reduce((sum, l) => sum + l.balance, 0);
        const totalInvestments = userData.investments.reduce((sum, h) => sum + h.value, 0);
        const ratio = totalInvestments > 0 ? totalDebt / totalInvestments : 0;
        const mockDebtData: DebtInvestmentRatioInfo = {
          totalDebt: totalDebt,
          totalInvestments: totalInvestments,
          ratio: ratio,
          recommendation: ratio < 0.5 ? 'Ratio looks good. Consider prioritizing investments.' : 'Ratio is high. Consider focusing on debt reduction.', // Simple mock logic
        };
        setDebtInfo(mockDebtData);
      }
      // --- End Mock Debt Info Data ---

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Removed generateProjectionData function

  // Format currency (Keep for now, might move to utils)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 text-sm">
          <p className="font-medium">Year {label}</p>
          <p className="text-soft-gold font-serif text-lg">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Investments Dashboard
          </h1>

          {/* Placeholder Section for Portfolio Overview */}
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Portfolio Overview</h2>
            <PortfolioOverview 
              portfolioData={portfolioData} 
              isLoading={isLoading} 
              currentBalance={currentBalance} // Pass current balance as prop
            />
          </section>

          {/* Recommendations Section */}
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Personalized Recommendations</h2>
            <InvestmentRecommendations 
              userProfile={userProfile} 
              isLoading={isLoading} 
              // recommendations={...} // Pass actual recommendations if fetched here
            />
          </section>

          {/* Projections Section */}
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Performance & Projections</h2>
            <PerformanceProjections 
              projectionData={projectionData} 
              isLoading={isLoading} 
            />
          </section>

          {/* Smart Savings Section */}
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Smart Savings & Passive Income</h2>
            <SmartSavings 
              isLoading={isLoading} 
              // Pass actual savingsProducts and passiveIncomeSources if fetched here
            />
          </section>

          {/* Debt Optimization Section */}
          <section className="mb-8">
            {/* Only render the heading if there's debt */}
            {hasDebt && !isLoading && (
              <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Debt-Optimized Investing</h2>
            )}
            <DebtInvestmentAdvisor 
              debtInfo={debtInfo} 
              isLoading={isLoading} 
              hasDebt={hasDebt} 
            />
          </section>

          {/* Calendar & Alerts Section */}
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Calendar & Alerts</h2>
            <InvestmentCalendar 
              isLoading={isLoading} 
              // Pass actual alerts if fetched here
            />
          </section>

          {/* Reports Section */}
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-4">Investment Reports</h2>
            <InvestmentReportGenerator 
              isLoading={isLoading} 
              // Pass latestReport if fetched here
            />
          </section>

          {/* Existing Investment Cards (Temporary - might be integrated into Overview or removed) */}
          <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-6">
            Current Investment Holdings (Temporary)
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" /> // Use Skeleton component
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TODO: This section needs review. InvestmentCard expects 'Investment'. 
                   Holdings are 'InvestmentHolding'. We might need a different card or modify InvestmentCard. 
                   For now, rendering placeholder text. */}
              {holdings.map((holding, index) => (
                 <GlassCard key={index} className="p-4">
                   <h3 className="font-semibold">{holding.name}</h3>
                   <p>Type: {holding.type}</p>
                   <p>Value: {formatCurrency(holding.value)}</p>
                 </GlassCard>
                // <InvestmentCard 
                //   key={holding.name} // Assuming name is unique for holdings for now
                //   investment={holding} // This will cause a type error if InvestmentCard expects Investment
                //   delay={index * 0.1}
                // />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investments;
