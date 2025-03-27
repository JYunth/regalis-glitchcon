import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { loadDemoData } from '@/utils/demoData';
import { getUserData, UserFinancialProfile } from '@/utils/localStorage';
import PersonalizedFinancialInsightsSection from '@/components/dashboard/widgets/PersonalizedFinancialInsightsSection';
// Removed SpendingBreakdownChart import
import InvestmentPerformanceTracker from '@/components/dashboard/widgets/InvestmentPerformanceTracker';
import ExpenseBreakdown from '@/components/insights/ExpenseBreakdown'; // Import the new component
import SuggestedBudget from '@/components/insights/SuggestedBudget';
import OverspendingAlerts from '@/components/insights/OverspendingAlerts';
import SavingsPotential from '@/components/insights/SavingsPotential';
import TailoredInvestments from '@/components/insights/TailoredInvestments';
import DebtManagement from '@/components/insights/DebtManagement';
import CreditScoreRoadmap from '@/components/insights/CreditScoreRoadmap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Added Card imports

const Insights = () => {
  const [userFinancialProfile, setUserFinancialProfile] = useState<UserFinancialProfile>({
    assets: [],
    liabilities: [],
    incomeSources: [],
    expenseBudgets: {},
  } as UserFinancialProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDemoData(); // Ensure demo data is loaded if needed

    // Simulate loading user data
    const timer = setTimeout(() => {
      const userData = getUserData();
      setUserFinancialProfile({
        ...{
          assets: [],
          liabilities: [],
          incomeSources: [],
          expenseBudgets: {},
        },
        ...userData,
      });
      setIsLoading(false);
    }, 500); // Shorter delay for insights page

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            AI Financial Insights
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder Skeleton Loaders */}
              <Card>
                <CardHeader>
                  <CardTitle>Loading Insights...</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
              {/* Removed Spending Breakdown Loader */}
               <Card>
                <CardHeader>
                  <CardTitle>Loading Investment Performance...</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="h-40 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personalized Insights */}
              <div className="md:col-span-2">
                  <PersonalizedFinancialInsightsSection userFinancialProfile={userFinancialProfile} />
              </div>

              {/* Removed Spending Breakdown Chart */}

              {/* Investment Performance */}
              <InvestmentPerformanceTracker userFinancialProfile={userFinancialProfile} />

              {/* Weekly/Monthly Expense Breakdown */}
              <ExpenseBreakdown transactions={userFinancialProfile.transactions || []} />

              {/* You can add more insight-related widgets here */}
              <SuggestedBudget />
              <OverspendingAlerts />
              <SavingsPotential />
              <TailoredInvestments />
              <DebtManagement />
              <CreditScoreRoadmap />
              {/* Placeholder cards removed */}
            </div>
          )}

          {/* Gamified Goals Section - Removed for now to fix syntax, can be added back if needed */}
          {/*
          {!isLoading && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Gamified Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-soft-bounce">
                      <span className="text-2xl font-bold text-primary">85%</span>
                    </div>
                    <h3 className="font-medium text-deep-charcoal">Savings Target</h3>
                  </div>
                  <div>
                    <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 animate-soft-bounce" style={{ animationDelay: '0.2s' }}>
                      <span className="text-2xl font-bold text-secondary">62%</span>
                    </div>
                    <h3 className="font-medium text-deep-charcoal">Investment Goals</h3>
                  </div>
                  <div>
                    <div className="w-24 h-24 rounded-full bg-soft-emerald/20 flex items-center justify-center mx-auto mb-4 animate-soft-bounce" style={{ animationDelay: '0.4s' }}>
                      <span className="text-2xl font-bold text-soft-emerald">93%</span>
                    </div>
                    <h3 className="font-medium text-deep-charcoal">Credit Score</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
