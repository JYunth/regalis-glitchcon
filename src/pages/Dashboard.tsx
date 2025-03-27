
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import BudgetProgress from '@/components/budget/BudgetProgress';
import { loadDemoData } from '@/utils/demoData';
import { getUserData, UserFinancialProfile } from '@/utils/localStorage';
import FinancialOverviewWidget from '@/components/dashboard/widgets/FinancialOverviewWidget';
import SpendingBreakdownChart from '@/components/dashboard/widgets/SpendingBreakdownChart';
import InvestmentPerformanceTracker from '@/components/dashboard/widgets/InvestmentPerformanceTracker';
import DebtReductionProgress from '@/components/dashboard/widgets/DebtReductionProgress';
import PersonalizedFinancialInsightsSection from '@/components/dashboard/widgets/PersonalizedFinancialInsightsSection';
import QuickActionButtons from '@/components/dashboard/widgets/QuickActionButtons';

const Dashboard = () => {
  const [userFinancialProfile, setUserFinancialProfile] = useState<UserFinancialProfile>({
    assets: [],
    liabilities: [],
    incomeSources: [],
    expenseBudgets: {},
  } as UserFinancialProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDemoData();

    // Simulate loading
    const timer = setTimeout(() => {
      const userData = getUserData();
      console.log('userData:', userData);
      setUserFinancialProfile({
        ...{
          assets: [],
          liabilities: [],
          incomeSources: [],
          expenseBudgets: {},
        },
        ...userData,
      });
      console.log('userFinancialProfile:', userFinancialProfile);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Financial Dashboard
          </h1>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FinancialOverviewWidget userFinancialProfile={userFinancialProfile} />
                <SpendingBreakdownChart userFinancialProfile={userFinancialProfile} />
                <DebtReductionProgress userFinancialProfile={userFinancialProfile} />
                <PersonalizedFinancialInsightsSection userFinancialProfile={userFinancialProfile} />
                <RecentTransactions />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <QuickActionButtons />
                <InvestmentPerformanceTracker userFinancialProfile={userFinancialProfile} />
                <BudgetProgress />
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
