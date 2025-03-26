
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BalanceCard from '@/components/dashboard/BalanceCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import SpendingChart from '@/components/dashboard/SpendingChart';
import BudgetProgress from '@/components/budget/BudgetProgress';
import { loadDemoData } from '@/utils/demoData';

const Dashboard = () => {
  // Load demo data when component mounts
  useEffect(() => {
    loadDemoData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Financial Dashboard
          </h1>
          
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
