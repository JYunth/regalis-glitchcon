import React from 'react';

interface BudgetCategoryProps {
  id: string;
  category: string;
  allocated: number;
  alertThreshold?: number;
  handleEditBudget: (id: string, newAmount: number) => void;
  handleEditAlertThreshold: (id: string, newThreshold: number) => void;
  handleDeleteCategory: (id: string) => void;
}

const BudgetCategory: React.FC<BudgetCategoryProps> = ({
  id,
  category,
  allocated,
  alertThreshold,
  handleEditBudget,
  handleEditAlertThreshold,
  handleDeleteCategory,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200">
      <div className="w-1/3">{category}</div>
      <div className="w-1/3">
        <input
          type="number"
          className="w-full px-2 py-1 text-right border border-gray-300 rounded"
          value={allocated}
          onChange={(e) => handleEditBudget(id, Number(e.target.value))}
        />
      </div>
      <div className="w-1/3 flex justify-end">
        <input
          type="number"
          className="w-2/3 px-2 py-1 text-right border border-gray-300 rounded"
          placeholder="Alert Threshold"
          value={alertThreshold || ''}
          onChange={(e) => handleEditAlertThreshold(id, Number(e.target.value))}
        />
        <button
          className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => handleDeleteCategory(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetCategory;
