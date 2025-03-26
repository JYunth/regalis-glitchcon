import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

import { getUserData, updateUserData } from "@/utils/localStorage"
import { Transaction } from "@/utils/localStorage"
import { v4 as uuidv4 } from 'uuid';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [incomeSources, setIncomeSources] = useState<string[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const userData = getUserData();
    setIncomeSources(userData.incomeSources.map(source => source.name));
    setExpenseCategories(Object.keys(userData.expenseBudgets));
  }, []);

  const tagOptions = transactionType === 'income' ? incomeSources : expenseCategories;

  const handleSubmit = () => {
    if (!title || !selectedTag || !date || !amount) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTransaction: Transaction = {
      id: uuidv4(),
      date: date.toISOString(),
      description: description,
      amount: transactionType === 'income' ? amount : -amount,
      category: selectedTag,
    };

    const userData = getUserData();
    const updatedTransactions = [...userData.transactions, newTransaction];
    updateUserData('transactions', updatedTransactions);

    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" value={title} className="col-span-3" onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <RadioGroup defaultValue="expense" className="col-span-3" onValueChange={(value) => setTransactionType(value as 'income' | 'expense')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="r1" />
                    <Label htmlFor="r1">Income</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expense" id="r2" />
                    <Label htmlFor="r2">Expense</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tag" className="text-right">
                  Tag
                </Label>
                <Select onValueChange={setSelectedTag}  >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {tagOptions.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input id="amount" type="number" value={amount} className="col-span-3" onChange={(e) => setAmount(Number(e.target.value))} />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date and Time
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" value={description} className="col-span-3" onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TransactionModal;
