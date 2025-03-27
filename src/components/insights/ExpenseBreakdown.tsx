import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction } from '@/utils/localStorage';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO, getWeekOfMonth, getMonth, Interval } from 'date-fns';

interface ExpenseBreakdownProps {
  transactions: Transaction[];
}

interface BreakdownData {
  period: string;
  total: number;
  categoryTotals: { [key: string]: number };
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const processExpenses = (period: 'weekly' | 'monthly'): BreakdownData[] => {
    const expenses = transactions.filter(t => t.amount < 0);
    const groupedExpenses: { [key: string]: { total: number; categoryTotals: { [key: string]: number } } } = {};
    const now = new Date();

    expenses.forEach(expense => {
      const expenseDate = parseISO(expense.date);
      let periodKey: string | null = null;
      let interval: Interval | null = null;

      if (period === 'weekly') {
        const weekStart = startOfWeek(expenseDate, { weekStartsOn: 1 }); // Monday as start
        const weekEnd = endOfWeek(expenseDate, { weekStartsOn: 1 });
         // Only include recent weeks (e.g., last 4 weeks)
        const fourWeeksAgo = startOfWeek(new Date(now.setDate(now.getDate() - 28)), { weekStartsOn: 1 });
        if (isWithinInterval(expenseDate, { start: fourWeeksAgo, end: endOfWeek(now, { weekStartsOn: 1 }) })) {
           periodKey = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd')}`;
        }

      } else { // monthly
        const monthStart = startOfMonth(expenseDate);
        const monthEnd = endOfMonth(expenseDate);
         // Only include recent months (e.g., last 3 months)
         const threeMonthsAgo = startOfMonth(new Date(now.setMonth(now.getMonth() - 3)));
         if (isWithinInterval(expenseDate, { start: threeMonthsAgo, end: endOfMonth(now) })) {
            periodKey = format(monthStart, 'MMMM yyyy');
         }
      }

      if (periodKey) {
        if (!groupedExpenses[periodKey]) {
          groupedExpenses[periodKey] = { total: 0, categoryTotals: {} };
        }
        const absAmount = Math.abs(expense.amount);
        groupedExpenses[periodKey].total += absAmount;
        groupedExpenses[periodKey].categoryTotals[expense.category] = (groupedExpenses[periodKey].categoryTotals[expense.category] || 0) + absAmount;
      }
    });

     // Sort periods chronologically before mapping
    const sortedKeys = Object.keys(groupedExpenses).sort((a, b) => {
        // Basic date parsing assumption based on format used for keys
        const dateA = period === 'weekly' ? parseISO(a.split(' - ')[0] + ' ' + now.getFullYear()) : parseISO(a);
        const dateB = period === 'monthly' ? parseISO(b.split(' - ')[0] + ' ' + now.getFullYear()) : parseISO(b);
        // Handle potential parsing errors if format changes
        try {
             if (period === 'weekly') {
                 const dateA = parseISO(a.split(' - ')[0] + ' ' + new Date().getFullYear());
                 const dateB = parseISO(b.split(' - ')[0] + ' ' + new Date().getFullYear());
                 return dateA.getTime() - dateB.getTime();
             } else { // monthly
                 const dateA = new Date(a);
                 const dateB = new Date(b);
                 return dateA.getTime() - dateB.getTime();
             }
        } catch (e) {
            console.error("Error parsing date keys for sorting:", a, b, e);
            return 0; // Keep original order on error
        }
    });


    return sortedKeys.map(key => ({
      period: key,
      total: groupedExpenses[key].total,
      categoryTotals: groupedExpenses[key].categoryTotals,
    }));
  };

  const weeklyData = useMemo(() => processExpenses('weekly'), [transactions]);
  const monthlyData = useMemo(() => processExpenses('monthly'), [transactions]);

  const renderTable = (data: BreakdownData[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Period</TableHead>
          <TableHead className="text-right">Total Expenses</TableHead>
          <TableHead>Top Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
           <TableRow>
             <TableCell colSpan={3} className="text-center text-gray-500 py-4">No expense data for this period.</TableCell>
           </TableRow>
         ) : (
          data.map(item => {
            const topCategory = Object.entries(item.categoryTotals)
              .sort(([, a], [, b]) => b - a)[0];
            return (
              <TableRow key={item.period}>
                <TableCell className="font-medium">{item.period}</TableCell>
                <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                <TableCell>{topCategory ? `${topCategory[0]} ($${topCategory[1].toFixed(2)})` : '-'}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'weekly' | 'monthly')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            {renderTable(weeklyData)}
          </TabsContent>
          <TabsContent value="monthly">
            {renderTable(monthlyData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseBreakdown;
