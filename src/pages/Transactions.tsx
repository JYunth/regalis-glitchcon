import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import TransactionModal from "@/components/TransactionModal";
import { getUserData, Transaction } from "@/utils/localStorage";
import { format } from "date-fns";

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const userData = getUserData();
    setTransactions(userData.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsModalOpen(true)}>Add new transaction</Button>
      </div>
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Implement the list of transactions here */}
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border p-4 rounded-md mb-4">
            <h3 className="font-semibold">{transaction.description}</h3>
            <p className="text-sm">{format(new Date(transaction.date), "MMMM dd, yyyy hh:mm a")}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Category: {transaction.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
