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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react" // Renamed to avoid conflict
import { cn } from "@/lib/utils" // Assuming cn utility exists for conditional classes

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
  const [time, setTime] = useState<string>('00:00'); // Added time state

  useEffect(() => {
    const userData = getUserData();
    const sources = userData.incomeSources || []; // Default to empty array if undefined/null
    const budgets = userData.expenseBudgets || {}; // Default to empty object if undefined/null
    setIncomeSources(sources.map(source => source.name));
    setExpenseCategories(Object.keys(budgets));
  }, []);

  // Dynamically generate tag options including "Other"
  const tagOptions = [
    ...(transactionType === 'income' ? incomeSources : expenseCategories),
    'Other'
  ];

  const handleSubmit = () => {
    if (!title || !selectedTag || !date || !amount) {
      alert('Please fill in all required fields.');
      return;
    }

    // Combine date and time
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0, 0); // Set hours and minutes, reset seconds/ms

    const newTransaction: Transaction = {
      id: uuidv4(),
      date: combinedDate.toISOString(), // Use combined date and time
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
      <AlertDialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
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
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  className="col-span-3"
                  onChange={(e) => setTime(e.target.value)}
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
