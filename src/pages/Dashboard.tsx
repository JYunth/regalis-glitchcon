
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BalanceCard from '@/components/dashboard/BalanceCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import SpendingChart from '@/components/dashboard/SpendingChart';
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <FinancialOverviewWidget userFinancialProfile={userFinancialProfile} />
                </div>
                <div className="md:col-span-1">
                  <QuickActionButtons />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SpendingBreakdownChart userFinancialProfile={userFinancialProfile} />
                <InvestmentPerformanceTracker userFinancialProfile={userFinancialProfile} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <DebtReductionProgress userFinancialProfile={userFinancialProfile} />
                <PersonalizedFinancialInsightsSection userFinancialProfile={userFinancialProfile} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <BalanceCard />
                </div>
                <div className="md:col-span-1">
                  <SpendingChart />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentTransactions />
                <BudgetProgress />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
