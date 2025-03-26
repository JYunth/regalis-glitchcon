import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress'; // Import Progress component

// Define the structure for the comprehensive profile
interface IncomeSource { name: string; amount: number; }
interface FinancialGoal { type: string; description: string; targetAmount: number; targetDate?: string; }
interface UserFinancialProfile {
  incomeSources: IncomeSource[];
  expenseBudgets: { [category: string]: number };
  financialGoals: FinancialGoal[];
  riskToleranceScore?: number;
  financialHealthScore?: number;
  onboardingComplete: boolean;
}

const TOTAL_STEPS = 6; // Define total number of steps

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  // State for each step's data (Initialize with empty/default values)
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([{ name: '', amount: 0 }]);
  const [expenseBudgets, setExpenseBudgets] = useState<{ [category: string]: number }>({
    housing: 0, food: 0, transport: 0, utilities: 0, entertainment: 0, other: 0
  });
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([{ type: '', description: '', targetAmount: 0 }]);
  const [riskAnswers, setRiskAnswers] = useState<{ [questionId: string]: string }>({}); // Placeholder for assessment answers
  const [healthAnswers, setHealthAnswers] = useState<{ [questionId: string]: string }>({}); // Placeholder for assessment answers

  // Redirect if already onboarded (Keep this logic)
  useEffect(() => {
    try {
      const profileString = localStorage.getItem('userFinancialProfile');
      if (profileString) {
        const profile = JSON.parse(profileString);
        if (profile && profile.onboardingComplete === true) {
          console.log('User already onboarded, redirecting to dashboard.');
          navigate('/', { replace: true }); // Redirect to dashboard
        }
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    }
  }, [navigate]);

  const nextStep = () => {
    // Add validation logic here before proceeding
    setError(''); // Clear previous errors
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    setError('');
    // Add final validation if needed

    // Calculate assessment scores (basic placeholder logic)
    const calculatedRiskScore = Object.keys(riskAnswers).length; // Example: score based on number of answers
    const calculatedHealthScore = Object.keys(healthAnswers).length; // Example

    const finalProfile: UserFinancialProfile = {
      incomeSources: incomeSources.filter(s => s.name && s.amount > 0), // Clean up empty entries
      expenseBudgets: expenseBudgets,
      financialGoals: financialGoals.filter(g => g.type && g.targetAmount > 0), // Clean up empty entries
      riskToleranceScore: calculatedRiskScore,
      financialHealthScore: calculatedHealthScore,
      onboardingComplete: true,
    };

    try {
      console.log('Saving final profile to local storage:', finalProfile);
      localStorage.setItem('userFinancialProfile', JSON.stringify(finalProfile));
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Failed to save final profile:', err);
      setError('Failed to save your information. Please try again.');
    }
  };

  // --- Step 1: Income Sources ---
  const handleIncomeChange = (index: number, field: keyof IncomeSource, value: string | number) => {
    const updatedSources = [...incomeSources];
    if (field === 'amount') {
      updatedSources[index][field] = Number(value) || 0;
    } else {
      updatedSources[index][field] = value as string;
    }
    setIncomeSources(updatedSources);
  };

  const addIncomeSource = () => {
    setIncomeSources([...incomeSources, { name: '', amount: 0 }]);
  };

  const removeIncomeSource = (index: number) => {
    if (incomeSources.length > 1) { // Keep at least one row
      const updatedSources = incomeSources.filter((_, i) => i !== index);
      setIncomeSources(updatedSources);
    } else {
      // Optionally clear the fields if it's the last one
      setIncomeSources([{ name: '', amount: 0 }]);
    }
  };

  const renderIncomeStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Income Sources</h3>
      {incomeSources.map((source, index) => (
        <div key={index} className="flex items-end space-x-2 border p-3 rounded-md relative">
          <div className="flex-1 space-y-1">
            <Label htmlFor={`income-name-${index}`}>Source Name</Label>
            <Input
              id={`income-name-${index}`}
              placeholder="e.g., Salary, Side Hustle"
              value={source.name}
              onChange={(e) => handleIncomeChange(index, 'name', e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`income-amount-${index}`}>Monthly Amount (After Tax)</Label>
            <Input
              id={`income-amount-${index}`}
              type="number"
              placeholder="e.g., 3000"
              value={source.amount === 0 ? '' : source.amount} // Show empty string for 0
              onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
            />
          </div>
          {incomeSources.length > 1 && (
             <Button
                variant="ghost"
                size="sm"
                onClick={() => removeIncomeSource(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                aria-label="Remove income source"
             >
                &times; {/* Simple X icon */}
             </Button>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={addIncomeSource} className="mt-2">
        + Add Another Source
      </Button>
    </div>
  );
  // --- End Step 1 ---

  // --- Step 2: Expense Budgeting ---
  const handleBudgetChange = (category: string, value: string) => {
    setExpenseBudgets(prev => ({
      ...prev,
      [category]: Number(value) || 0
    }));
  };

  const renderExpenseStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Monthly Expense Budgets</h3>
      <p className="text-sm text-muted-foreground mb-4">Estimate your typical monthly spending for these categories.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(expenseBudgets).map(([category, amount]) => (
          <div key={category} className="space-y-1">
            <Label htmlFor={`budget-${category}`} className="capitalize">{category}</Label>
            <Input
              id={`budget-${category}`}
              type="number"
              placeholder="e.g., 500"
              value={amount === 0 ? '' : amount}
              onChange={(e) => handleBudgetChange(category, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
  // --- End Step 2 ---

  // --- Step 3: Financial Goals ---
  const handleGoalChange = (index: number, field: keyof FinancialGoal, value: string | number) => {
    const updatedGoals = [...financialGoals];
    if (field === 'targetAmount') {
      updatedGoals[index][field] = Number(value) || 0;
    } else {
      updatedGoals[index][field] = value as string;
    }
    setFinancialGoals(updatedGoals);
  };

  const addGoal = () => {
    setFinancialGoals([...financialGoals, { type: '', description: '', targetAmount: 0 }]);
  };

  const removeGoal = (index: number) => {
    if (financialGoals.length > 1) {
      setFinancialGoals(financialGoals.filter((_, i) => i !== index));
    } else {
      setFinancialGoals([{ type: '', description: '', targetAmount: 0 }]);
    }
  };

  const renderGoalStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Financial Goals</h3>
      <p className="text-sm text-muted-foreground mb-4">What are you saving towards? Add your major financial goals.</p>
      {financialGoals.map((goal, index) => (
        <div key={index} className="border p-4 rounded-md space-y-3 relative">
           {financialGoals.length > 1 && (
             <Button
                variant="ghost"
                size="sm"
                onClick={() => removeGoal(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                aria-label="Remove goal"
             >
                &times;
             </Button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor={`goal-type-${index}`}>Goal Type</Label>
              <Input // Could replace with Select if predefined types exist
                id={`goal-type-${index}`}
                placeholder="e.g., Retirement, House, Vacation"
                value={goal.type}
                onChange={(e) => handleGoalChange(index, 'type', e.target.value)}
              />
            </div>
             <div className="space-y-1">
              <Label htmlFor={`goal-desc-${index}`}>Description (Optional)</Label>
              <Input
                id={`goal-desc-${index}`}
                placeholder="e.g., Down payment for first home"
                value={goal.description}
                onChange={(e) => handleGoalChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`goal-amount-${index}`}>Target Amount</Label>
              <Input
                id={`goal-amount-${index}`}
                type="number"
                placeholder="e.g., 20000"
                value={goal.targetAmount === 0 ? '' : goal.targetAmount}
                onChange={(e) => handleGoalChange(index, 'targetAmount', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`goal-date-${index}`}>Target Date (Optional)</Label>
              <Input
                id={`goal-date-${index}`}
                type="date"
                value={goal.targetDate || ''}
                onChange={(e) => handleGoalChange(index, 'targetDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addGoal} className="mt-2">
        + Add Another Goal
      </Button>
    </div>
  );
  // --- End Step 3 ---

  // --- Step 4: Risk Tolerance Assessment ---
  const riskQuestions = [
    { id: 'risk-1', text: 'How comfortable are you with potential investment losses?' },
    { id: 'risk-2', text: 'Do you prioritize high returns over investment safety?' },
    { id: 'risk-3', text: 'How long do you plan to invest your money?' },
  ];

  const handleRiskAnswer = (questionId: string, answer: string) => {
    setRiskAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const renderRiskStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Risk Tolerance Assessment</h3>
      <p className="text-sm text-muted-foreground mb-4">Answer these questions to help us understand your investment risk tolerance.</p>
      {riskQuestions.map(question => (
        <div key={question.id} className="border p-4 rounded-md space-y-2">
          <Label htmlFor={question.id} className="font-semibold">{question.text}</Label>
          <div className="space-x-4 mt-2">
            <Button variant="outline" onClick={() => handleRiskAnswer(question.id, 'low')}>Low</Button>
            <Button variant="outline" onClick={() => handleRiskAnswer(question.id, 'medium')}>Medium</Button>
            <Button variant="outline" onClick={() => handleRiskAnswer(question.id, 'high')}>High</Button>
          </div>
        </div>
      ))}
    </div>
  );
  // --- End Step 4 ---

  // --- Step 5: Financial Health Assessment ---
  const healthQuestions = [
    { id: 'health-1', text: 'Do you have an emergency fund to cover unexpected expenses?' },
    { id: 'health-2', text: 'Are you currently managing any debt (credit cards, loans)?' },
    { id: 'health-3', text: 'Do you regularly save a portion of your income?' },
  ];

  const handleHealthAnswer = (questionId: string, answer: string) => {
    setHealthAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const renderHealthStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Financial Health Assessment</h3>
      <p className="text-sm text-muted-foreground mb-4">Answer these questions to assess your overall financial health.</p>
      {healthQuestions.map(question => (
        <div key={question.id} className="border p-4 rounded-md space-y-2">
          <Label htmlFor={question.id} className="font-semibold">{question.text}</Label>
          <div className="space-x-4 mt-2">
            <Button variant="outline" onClick={() => handleHealthAnswer(question.id, 'yes')}>Yes</Button>
            <Button variant="outline" onClick={() => handleHealthAnswer(question.id, 'no')}>No</Button>
          </div>
        </div>
      ))}
    </div>
  );
  // --- End Step 5 ---

  // --- Step 6: Review & Submit ---
  const renderReviewStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
      <p className="text-sm text-muted-foreground mb-4">Please review the information you've provided. You can go back to edit any section.</p>
      {/* Display summary of all data here - PLACEHOLDER */}
      <p>Income Sources: {incomeSources.length} sources</p>
      <p>Expense Budgets: {Object.keys(expenseBudgets).length} categories</p>
      <p>Financial Goals: {financialGoals.length} goals</p>
      <p>Risk Assessment: {Object.keys(riskAnswers).length} answers</p>
      <p>Health Assessment: {Object.keys(healthAnswers).length} answers</p>
    </div>
  );
  // --- End Step 6 ---

  // Helper function to render the current step's content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderIncomeStep();
      case 2: return renderExpenseStep();
      case 3: return renderGoalStep();
      case 4: return renderRiskStep();
      case 5: return renderHealthStep();
      case 6: return renderReviewStep(); // Use the new function for Step 6
      default: return <div>Invalid Step</div>;
    }
  };

  const progressValue = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg"> {/* Increased max-width */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Financial Onboarding</CardTitle>
          <CardDescription className="text-center">
            Step {currentStep} of {TOTAL_STEPS}
          </CardDescription>
          <Progress value={progressValue} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="min-h-[300px]"> {/* Added min-height */}
          {/* Render the content for the current step */}
          {renderStepContent()}

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          {currentStep < TOTAL_STEPS ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={handleFinalSubmit}>Finish & Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
