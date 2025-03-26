import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const QuickActionButtons = () => {
  return (
    <GlassCard className="w-full">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-4">
        <Link to="/transactions/add">
          <Button className="w-full">Add Transaction</Button>
        </Link>
        <Link to="/budgets/create">
          <Button className="w-full">Create Budget</Button>
        </Link>
        <Link to="/recommendations">
          <Button className="w-full">View Recommendations</Button>
        </Link>
      </div>
    </GlassCard>
  );
};

export default QuickActionButtons;
