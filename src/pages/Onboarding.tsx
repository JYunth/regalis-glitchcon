import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress'; // Import Progress component
import { Transaction, Budget, Investment, ChatMessage, UserSettings } from '@/utils/localStorage';

// Define the structure for the comprehensive profile
export interface IncomeSource { name: string; amount: number; }
export interface FinancialGoal { type: string; description: string; targetAmount: number; targetDate?: string; }
// NEW data structures
export interface Asset { type: string; description: string; value: number; }
export interface Liability { type: string; description: string; balance: number; interestRate?: number; }
export interface InvestmentHolding { type: string; name: string; value: number; }

interface UserFinancialProfile {
  incomeSources: IncomeSource[];
  expenseBudgets: { [category: string]: number };
  financialGoals: FinancialGoal[];
  assets: Asset[]; // NEW
  liabilities: Liability[]; // NEW
  investments: InvestmentHolding[]; // NEW
  riskToleranceScore?: number;
  financialHealthScore?: number;
  onboardingComplete: boolean;
  balance: number;
  transactions: Transaction[];
  budgets: Budget[];
  investmentSuggestions: Investment[];
  chatHistory: ChatMessage[];
  settings: UserSettings;
}

const TOTAL_STEPS = 9; // Updated total number of steps

interface OnboardingProps {
  balance?: number;
}

const Onboarding: React.FC<OnboardingProps> = ({ balance = 0 }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  // State for each step's data (Initialize with empty/default values)
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([{ name: '', amount: 0 }]);
  const [expenseBudgets, setExpenseBudgets] = useState<{ [category: string]: number }>({
    housing: 0, food: 0, transport: 0, utilities: 0, entertainment: 0, other: 0
  });
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([{ type: '', description: '', targetAmount: 0 }]);
  // NEW state variables for added steps
  const [assets, setAssets] = useState<Asset[]>([{ type: '', description: '', value: 0 }]);
  const [liabilities, setLiabilities] = useState<Liability[]>([{ type: '', description: '', balance: 0, interestRate: 0 }]);
  const [investments, setInvestments] = useState<InvestmentHolding[]>([{ type: '', name: '', value: 0 }]);
  // END NEW state variables
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
          navigate('/dashboard', { replace: true }); // Redirect to dashboard (ensure correct path)
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

    // Get the existing userFinancialProfile from localStorage
    let finalProfile: UserFinancialProfile = {} as UserFinancialProfile;
    const existingProfileString = localStorage.getItem('userFinancialProfile');
    if (existingProfileString) {
      finalProfile = JSON.parse(existingProfileString) as UserFinancialProfile;
    } else {
      finalProfile = {
        incomeSources: [],
        expenseBudgets: {},
        financialGoals: [],
        assets: [],
        liabilities: [],
        investments: [],
        riskToleranceScore: 0,
        financialHealthScore: 0,
        onboardingComplete: false,
        balance: 0,
        transactions: [],
        budgets: [],
        investmentSuggestions: [],
        chatHistory: [],
        settings: {
          name: 'Alexandra Wilson',
          email: 'alex@example.com',
          currency: 'USD',
          notifications: true,
        }
      };
    }

    finalProfile = {
      ...finalProfile,
      incomeSources: incomeSources.filter(s => s.name && s.amount > 0),
      expenseBudgets: expenseBudgets,
      financialGoals: financialGoals.filter(g => g.type && g.targetAmount > 0),
      assets: assets.filter(a => a.type && a.value > 0),
      liabilities: liabilities.filter(l => l.type && l.balance > 0),
      investments: investments.filter(i => i.type && i.value > 0),
      riskToleranceScore: calculatedRiskScore,
      financialHealthScore: calculatedHealthScore,
      onboardingComplete: true,
      balance: balance,
    };

    try {
      console.log('Saving final profile to local storage:', finalProfile);
      localStorage.setItem('userFinancialProfile', JSON.stringify(finalProfile));
      navigate('/dashboard');
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
      setIncomeSources([{ name: '', amount: 0 }]);
    }
  };

  const renderIncomeStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Income Sources</h3>
      <p className="text-sm text-muted-foreground mb-4">List your regular sources of income (monthly, after tax).</p>
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
            <Label htmlFor={`income-amount-${index}`}>Monthly Amount ($)</Label>
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
                className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 h-auto"
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
                className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 h-auto"
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
              <Label htmlFor={`goal-amount-${index}`}>Target Amount ($)</Label>
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


  // --- NEW Step 4: Assets ---
  const handleAssetChange = (index: number, field: keyof Asset, value: string | number) => {
    const updatedAssets = [...assets];
    if (field === 'value') {
      updatedAssets[index][field] = Number(value) || 0;
    } else {
      updatedAssets[index][field] = value as string;
    }
    setAssets(updatedAssets);
  };

  const addAsset = () => {
    setAssets([...assets, { type: '', description: '', value: 0 }]);
  };

  const removeAsset = (index: number) => {
    if (assets.length > 1) {
      setAssets(assets.filter((_, i) => i !== index));
    } else {
      setAssets([{ type: '', description: '', value: 0 }]);
    }
  };

  const renderAssetsStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Assets</h3>
      <p className="text-sm text-muted-foreground mb-4">List your significant assets and their estimated current value.</p>
      {assets.map((asset, index) => (
        <div key={index} className="flex items-end space-x-2 border p-3 rounded-md relative">
          <div className="flex-1 space-y-1">
            <Label htmlFor={`asset-type-${index}`}>Asset Type</Label>
            <Input
              id={`asset-type-${index}`}
              placeholder="e.g., Savings Account, Real Estate, Stocks"
              value={asset.type}
              onChange={(e) => handleAssetChange(index, 'type', e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`asset-desc-${index}`}>Description (Optional)</Label>
            <Input
              id={`asset-desc-${index}`}
              placeholder="e.g., Primary Residence, Emergency Fund"
              value={asset.description}
              onChange={(e) => handleAssetChange(index, 'description', e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`asset-value-${index}`}>Estimated Value ($)</Label>
            <Input
              id={`asset-value-${index}`}
              type="number"
              placeholder="e.g., 50000"
              value={asset.value === 0 ? '' : asset.value}
              onChange={(e) => handleAssetChange(index, 'value', e.target.value)}
            />
          </div>
          {assets.length > 1 && (
             <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAsset(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 h-auto"
                aria-label="Remove asset"
             >
                &times;
             </Button>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={addAsset} className="mt-2">
        + Add Another Asset
      </Button>
    </div>
  );
  // --- End NEW Step 4 ---


  // --- NEW Step 5: Liabilities ---
  const handleLiabilityChange = (index: number, field: keyof Liability, value: string | number) => {
    const updatedLiabilities = [...liabilities];
    if (field === 'balance' || field === 'interestRate') {
      updatedLiabilities[index][field] = Number(value) || 0;
    } else {
      updatedLiabilities[index][field] = value as string;
    }
    setLiabilities(updatedLiabilities);
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { type: '', description: '', balance: 0, interestRate: 0 }]);
  };

  const removeLiability = (index: number) => {
    if (liabilities.length > 1) {
      setLiabilities(liabilities.filter((_, i) => i !== index));
    } else {
      setLiabilities([{ type: '', description: '', balance: 0, interestRate: 0 }]);
    }
  };

  const renderLiabilitiesStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Liabilities (Debts)</h3>
      <p className="text-sm text-muted-foreground mb-4">List your outstanding debts and their current balances.</p>
      {liabilities.map((liability, index) => (
        <div key={index} className="border p-4 rounded-md space-y-3 relative">
           {liabilities.length > 1 && (
             <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLiability(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 h-auto"
                aria-label="Remove liability"
             >
                &times;
             </Button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor={`liability-type-${index}`}>Liability Type</Label>
              <Input
                id={`liability-type-${index}`}
                placeholder="e.g., Credit Card, Mortgage, Student Loan"
                value={liability.type}
                onChange={(e) => handleLiabilityChange(index, 'type', e.target.value)}
              />
            </div>
             <div className="space-y-1">
              <Label htmlFor={`liability-desc-${index}`}>Description (Optional)</Label>
              <Input
                id={`liability-desc-${index}`}
                placeholder="e.g., Visa Card, Primary Mortgage"
                value={liability.description}
                onChange={(e) => handleLiabilityChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`liability-balance-${index}`}>Outstanding Balance ($)</Label>
              <Input
                id={`liability-balance-${index}`}
                type="number"
                placeholder="e.g., 5000"
                value={liability.balance === 0 ? '' : liability.balance}
                onChange={(e) => handleLiabilityChange(index, 'balance', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`liability-rate-${index}`}>Interest Rate (%) (Optional)</Label>
              <Input
                id={`liability-rate-${index}`}
                type="number"
                placeholder="e.g., 19.9"
                value={liability.interestRate === 0 ? '' : liability.interestRate}
                onChange={(e) => handleLiabilityChange(index, 'interestRate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addLiability} className="mt-2">
        + Add Another Liability
      </Button>
    </div>
  );
  // --- End NEW Step 5 ---


  // --- NEW Step 6: Investments ---
  const handleInvestmentChange = (index: number, field: keyof InvestmentHolding, value: string | number) => {
    const updatedInvestments = [...investments];
    if (field === 'value') {
      updatedInvestments[index][field] = Number(value) || 0;
    } else {
      updatedInvestments[index][field] = value as string;
    }
    setInvestments(updatedInvestments);
  };

  const addInvestment = () => {
    setInvestments([...investments, { type: '', name: '', value: 0 }]);
  };

  const removeInvestment = (index: number) => {
    if (investments.length > 1) {
      setInvestments(investments.filter((_, i) => i !== index));
    } else {
      setInvestments([{ type: '', name: '', value: 0 }]);
    }
  };

  const renderInvestmentsStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Investment Holdings</h3>
      <p className="text-sm text-muted-foreground mb-4">List your current investment holdings and their estimated values.</p>
      {investments.map((investment, index) => (
        <div key={index} className="flex items-end space-x-2 border p-3 rounded-md relative">
          <div className="flex-1 space-y-1">
            <Label htmlFor={`investment-type-${index}`}>Investment Type</Label>
            <Input
              id={`investment-type-${index}`}
              placeholder="e.g., Stocks, Bonds, ETF, Mutual Fund"
              value={investment.type}
              onChange={(e) => handleInvestmentChange(index, 'type', e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`investment-name-${index}`}>Name/Symbol</Label>
            <Input
              id={`investment-name-${index}`}
              placeholder="e.g., VOO, Apple Inc."
              value={investment.name}
              onChange={(e) => handleInvestmentChange(index, 'name', e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`investment-value-${index}`}>Estimated Value ($)</Label>
            <Input
              id={`investment-value-${index}`}
              type="number"
              placeholder="e.g., 10000"
              value={investment.value === 0 ? '' : investment.value}
              onChange={(e) => handleInvestmentChange(index, 'value', e.target.value)}
            />
          </div>
          {investments.length > 1 && (
             <Button
                variant="ghost"
                size="sm"
                onClick={() => removeInvestment(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1 h-auto"
                aria-label="Remove investment"
             >
                &times;
             </Button>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={addInvestment} className="mt-2">
        + Add Another Investment
      </Button>
    </div>
  );
  // --- End NEW Step 6 ---


  // --- Step 7: Risk Tolerance Assessment (Renumbered) ---
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
            {/* Consider using RadioGroup or styled buttons for better selection indication */}
            <Button variant={riskAnswers[question.id] === 'low' ? 'default' : 'outline'} onClick={() => handleRiskAnswer(question.id, 'low')}>Low</Button>
            <Button variant={riskAnswers[question.id] === 'medium' ? 'default' : 'outline'} onClick={() => handleRiskAnswer(question.id, 'medium')}>Medium</Button>
            <Button variant={riskAnswers[question.id] === 'high' ? 'default' : 'outline'} onClick={() => handleRiskAnswer(question.id, 'high')}>High</Button>
          </div>
        </div>
      ))}
    </div>
  );
  // --- End Step 7 ---


  // --- Step 8: Financial Health Assessment (Renumbered) ---
  const healthQuestions = [
    { id: 'health-1', text: 'Do you have an emergency fund (3-6 months of expenses)?' },
    { id: 'health-2', text: 'Are you actively managing high-interest debt (e.g., credit cards)?' },
    { id: 'health-3', text: 'Do you consistently save/invest a portion of your income?' },
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
            <Button variant={healthAnswers[question.id] === 'yes' ? 'default' : 'outline'} onClick={() => handleHealthAnswer(question.id, 'yes')}>Yes</Button>
            <Button variant={healthAnswers[question.id] === 'no' ? 'default' : 'outline'} onClick={() => handleHealthAnswer(question.id, 'no')}>No</Button>
          </div>
        </div>
      ))}
    </div>
  );
  // --- End Step 8 ---


  // --- Step 9: Review & Submit (Renumbered) ---
  const renderReviewStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
      <p className="text-sm text-muted-foreground mb-4">Please review the information you've provided. You can go back to edit any section.</p>
      {/* Display summary of all data here */}
      <div className="space-y-2 text-sm">
        <p><strong>Income Sources:</strong> {incomeSources.filter(s => s.name && s.amount > 0).length} sources entered.</p>
        <p><strong>Expense Budgets:</strong> {Object.keys(expenseBudgets).length} categories budgeted.</p>
        <p><strong>Financial Goals:</strong> {financialGoals.filter(g => g.type && g.targetAmount > 0).length} goals listed.</p>
        <p><strong>Assets:</strong> {assets.filter(a => a.type && a.value > 0).length} assets listed.</p>
        <p><strong>Liabilities:</strong> {liabilities.filter(l => l.type && l.balance > 0).length} liabilities listed.</p>
        <p><strong>Investments:</strong> {investments.filter(i => i.type && i.value > 0).length} investments listed.</p>
        <p><strong>Risk Assessment:</strong> {Object.keys(riskAnswers).length} questions answered.</p>
        <p><strong>Health Assessment:</strong> {Object.keys(healthAnswers).length} questions answered.</p>
      </div>
    </div>
  );
  // --- End Step 9 ---


  // Helper function to render the current step's content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderIncomeStep();
      case 2: return renderExpenseStep();
      case 3: return renderGoalStep();
      case 4: return renderAssetsStep(); // NEW
      case 5: return renderLiabilitiesStep(); // NEW
      case 6: return renderInvestmentsStep(); // NEW
      case 7: return renderRiskStep(); // Renumbered
      case 8: return renderHealthStep(); // Renumbered
      case 9: return renderReviewStep(); // Renumbered
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
