import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import TransactionModal from "@/components/TransactionModal";
import { getUserData, Transaction, UserFinancialProfile } from "@/utils/localStorage"; // Import UserFinancialProfile
import { format } from "date-fns";
import Navbar from '@/components/layout/Navbar'; // Import Navbar
import { IncomeSource } from '@/pages/Onboarding'; // Import IncomeSource
import TransactionItem from '@/components/transactions/TransactionItem'; // Import TransactionItem

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // Add state for incomeSources and expenseBudgets as planned
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [expenseBudgets, setExpenseBudgets] = useState<{ [category: string]: number }>({});

  useEffect(() => {
    const userData: UserFinancialProfile = getUserData();
    // Sort transactions by date descending
    const sortedTransactions = [...userData.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(sortedTransactions);
    setIncomeSources(userData.incomeSources || []); // Set income sources
    setExpenseBudgets(userData.expenseBudgets || {}); // Set expense budgets
  }, []); // Run once on mount

  // Function to refresh transactions after adding a new one
  const refreshTransactions = () => {
    const userData: UserFinancialProfile = getUserData();
    const sortedTransactions = [...userData.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(sortedTransactions);
    // Optionally refresh income/budgets if they can change, though less likely here
    // setIncomeSources(userData.incomeSources || []);
    // setExpenseBudgets(userData.expenseBudgets || {});
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    refreshTransactions(); // Refresh data when modal closes
  };


  return (
    <> {/* Use Fragment to wrap Navbar and content */}
      <Navbar />
      {/* Increased top padding here (pt-24) */}
      <div className="container mx-auto pt-24 pb-6">
        <div className="flex justify-between items-center mb-4"> {/* Use justify-between for title and button */}
            <h1 className="text-2xl font-semibold">Transactions</h1> {/* Add a title */}
            <Button onClick={() => setIsModalOpen(true)}>Add new transaction</Button>
        </div>
      {/* Pass the updated onClose handler */}
      <TransactionModal isOpen={isModalOpen} onClose={handleModalClose} />
      {/* Implement the list of transactions here (placeholder for TransactionItem) */}
      <div className="space-y-2"> {/* Reduce spacing slightly if using TransactionItem's margin */}
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            // Use the TransactionItem component
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              // incomeSources={incomeSources} // Pass props if needed by TransactionItem
              // expenseBudgets={expenseBudgets}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No transactions yet.</p> // Handle empty state
        )}
      </div>
    </div>
    </>
  );
};

export default Transactions;
