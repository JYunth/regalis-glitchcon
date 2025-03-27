import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import BudgetProgress from '@/components/budget/BudgetProgress';
import { loadDemoData } from '@/utils/demoData';
import { getUserData, UserFinancialProfile } from '@/utils/localStorage';
import FinancialOverviewWidget from '@/components/dashboard/widgets/FinancialOverviewWidget';
// Updated import name for the budget chart component
import BudgetAllocationChart from '@/components/dashboard/widgets/SpendingBreakdownChart'; 
import InvestmentPerformanceTracker from '@/components/dashboard/widgets/InvestmentPerformanceTracker';
import DebtReductionProgress from '@/components/dashboard/widgets/DebtReductionProgress';
import PersonalizedFinancialInsightsSection from '@/components/dashboard/widgets/PersonalizedFinancialInsightsSection';
import QuickActionButtons from '@/components/dashboard/widgets/QuickActionButtons';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component

const Dashboard = () => {
  const [userFinancialProfile, setUserFinancialProfile] = useState<UserFinancialProfile | null>(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDemoData(); // Assuming this is synchronous or we don't wait for it

    // Removed artificial setTimeout
    const userData = getUserData();
    // console.log('userData:', userData); // Keep for debugging if needed
    setUserFinancialProfile({
      // Ensure default structure if userData is partial
      assets: [],
      liabilities: [],
      incomeSources: [],
      expenseBudgets: {},
      settings: { currency: 'USD' }, // Add default settings if needed
      ...userData,
    });
    // console.log('userFinancialProfile:', userFinancialProfile); // Keep for debugging if needed
    setIsLoading(false);

    // Removed timer cleanup
  }, []); // Run once on mount

  // Define Skeleton structure for loading state
  const DashboardSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" /> {/* FinancialOverviewWidget */}
        <Skeleton className="h-20 w-full rounded-xl" /> {/* QuickActionButtons */}
        <Skeleton className="h-64 w-full rounded-xl" /> {/* BudgetProgress */}
        <Skeleton className="h-64 w-full rounded-xl" /> {/* SpendingBreakdownChart */}
        <Skeleton className="h-56 w-full rounded-xl" /> {/* RecentTransactions */}
      </div>
      {/* Right Column Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-xl" /> {/* InvestmentPerformanceTracker */}
        <Skeleton className="h-24 w-full rounded-xl" /> {/* DebtReductionProgress */}
        <Skeleton className="h-48 w-full rounded-xl" /> {/* PersonalizedFinancialInsightsSection */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Reduced top padding from pt-24 to pt-16 */}
      <main className="flex-grow pt-16 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Financial Dashboard
          </h1>

          {isLoading || !userFinancialProfile ? ( // Show skeleton if loading or profile is null
            <DashboardSkeleton />
          ) : (
            // Reordered widgets for better information flow
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FinancialOverviewWidget userFinancialProfile={userFinancialProfile} />
                <QuickActionButtons />
                <BudgetProgress />
                {/* Updated component usage */}
                <BudgetAllocationChart userFinancialProfile={userFinancialProfile} /> 
                <RecentTransactions />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <InvestmentPerformanceTracker userFinancialProfile={userFinancialProfile} />
                <DebtReductionProgress userFinancialProfile={userFinancialProfile} />
                <PersonalizedFinancialInsightsSection userFinancialProfile={userFinancialProfile} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
