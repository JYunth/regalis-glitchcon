import React, { useState, useEffect } from 'react';
import BudgetCategory from '@/components/budget/BudgetCategory';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { Budget, getUserData, saveUserData } from '@/utils/localStorage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { v4 as uuidv4 } from 'uuid';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState<number>(0);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName && newBudgetAmount > 0) {
      const newBudget: Budget = {
        id: uuidv4(),
        category: newCategoryName,
        allocated: newBudgetAmount,
        spent: 0,
      };
      const userData = getUserData();
      userData.budgets = [...userData.budgets, newBudget];
      saveUserData(userData);
      setBudgets([...budgets, newBudget]);
      setNewCategoryName('');
      setNewBudgetAmount(0);
    }
  };

  const handleDeleteCategory = (id: string) => {
    const userData = getUserData();
    userData.budgets = userData.budgets.filter((budget) => budget.id !== id);
    saveUserData(userData);
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const handleEditBudget = (id: string, newAmount: number) => {
    const userData = getUserData();
    userData.budgets = userData.budgets.map((budget) =>
      budget.id === id ? { ...budget, allocated: newAmount } : budget
    );
    saveUserData(userData);
    setBudgets(
      budgets.map((budget) =>
        budget.id === id ? { ...budget, allocated: newAmount } : budget
      )
    );
  };

  const handleEditAlertThreshold = (id: string, newThreshold: number) => {
    const userData = getUserData();
    userData.budgets = userData.budgets.map((budget) =>
      budget.id === id ? { ...budget, alertThreshold: newThreshold } : budget
    );
    saveUserData(userData);
    setBudgets(
      budgets.map((budget) =>
        budget.id === id ? { ...budget, alertThreshold: newThreshold } : budget
      )
    );
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const userData = getUserData();
      // Initialize with default budgets if empty
      if (userData.budgets.length === 0) {
        const defaultBudgets: Budget[] = [
          { id: '1', category: 'Transport', allocated: 500, spent: 0 },
          { id: '2', category: 'Utilities', allocated: 300, spent: 0 },
          { id: '3', category: 'Groceries', allocated: 400, spent: 0 },
          { id: '4', category: 'Healthcare', allocated: 200, spent: 0 },
          { id: '5', category: 'Entertainment', allocated: 200, spent: 0 },
          { id: '6', category: 'Housing', allocated: 1000, spent: 0 },
        ];
        userData.budgets = defaultBudgets;
        saveUserData(userData);
        setBudgets(defaultBudgets);
      } else {
        setBudgets(userData.budgets);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Budget Category Management
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Budget Planner */}
            <GlassCard>
              <h2 className="font-serif text-xl text-deep-charcoal mb-4">Monthly Budget Planner</h2>
              {budgets.map((budget) => (
                <BudgetCategory
                  key={budget.id}
                  id={budget.id}
                  category={budget.category}
                  allocated={budget.allocated}
                  alertThreshold={budget.alertThreshold}
                  handleEditBudget={handleEditBudget}
                  handleEditAlertThreshold={handleEditAlertThreshold}
                  handleDeleteCategory={handleDeleteCategory}
                />
              ))}
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-xl text-deep-charcoal mb-4">Add Category</h2>
              <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="categoryName" className="block text-sm font-medium text-deep-charcoal">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="budgetAmount" className="block text-sm font-medium text-deep-charcoal">
                    Budget Amount
                  </label>
                  <input
                    type="number"
                    id="budgetAmount"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0"
                    onChange={(e) => setNewBudgetAmount(Number(e.target.value))}
                  />
                </div>
                <button type="submit" className="gold-btn">
                  Add Category
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetManagement;
