import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Assuming a utility function exists or will be created for local storage
// import { saveToLocalStorage } from '@/utils/localStorage';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState('');
  const [housingCost, setHousingCost] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [bankBalance, setBankBalance] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [savingsTarget, setSavingsTarget] = useState('');
  const [error, setError] = useState('');

  // Redirect if already onboarded
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
      // Proceed with showing the onboarding page if there's an error reading status
    }
  }, [navigate]); // Dependency array includes navigate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!income || !housingCost || !otherExpenses || !bankBalance) {
      setError('Please fill in all required fields.');
      return;
    }

    const financialData = {
      monthlyIncome: parseFloat(income) || 0,
      monthlyHousingCost: parseFloat(housingCost) || 0,
      monthlyOtherExpenses: parseFloat(otherExpenses) || 0,
      currentBankBalance: parseFloat(bankBalance) || 0,
      savingsGoal: savingsGoal || null,
      savingsTarget: savingsTarget ? parseFloat(savingsTarget) : null,
      onboardingComplete: true, // Flag to indicate completion
    };

    // Input validation check for numbers
    if (isNaN(financialData.monthlyIncome) || isNaN(financialData.monthlyHousingCost) || isNaN(financialData.monthlyOtherExpenses) || isNaN(financialData.currentBankBalance) || (savingsTarget && isNaN(financialData.savingsTarget))) {
        setError('Please ensure all monetary values are valid numbers.');
        return;
    }


    try {
      // TODO: Use actual local storage utility
      console.log('Saving to local storage:', financialData);
      localStorage.setItem('userFinancialProfile', JSON.stringify(financialData));
      // saveToLocalStorage('userFinancialProfile', financialData);

      // Redirect to dashboard after successful submission
      navigate('/');
    } catch (err) {
      console.error('Failed to save to local storage:', err);
      setError('Failed to save your information. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome! Let's Get Started</CardTitle>
          <CardDescription className="text-center">
            Please provide some basic financial information to personalize your experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="income">Monthly Income (After Tax)</Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 3000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="housing">Monthly Housing Cost (Rent/Mortgage)</Label>
              <Input
                id="housing"
                type="number"
                placeholder="e.g., 1000"
                value={housingCost}
                onChange={(e) => setHousingCost(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="expenses">Estimated Other Major Monthly Expenses</Label>
              <Input
                id="expenses"
                type="number"
                placeholder="e.g., 800 (Food, Transport, Utilities)"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="balance">Approximate Total Current Bank Balance</Label>
              <Input
                id="balance"
                type="number"
                placeholder="e.g., 5000"
                value={bankBalance}
                onChange={(e) => setBankBalance(e.target.value)}
                required
              />
            </div>
            <div className="pt-4 border-t">
              <Label htmlFor="goal" className="text-lg font-semibold">Optional: Primary Savings Goal</Label>
              <div className="mt-2 space-y-2">
                 <Label htmlFor="goal-desc" className="text-sm">What are you saving for?</Label>
                 <Input
                    id="goal-desc"
                    type="text"
                    placeholder="e.g., New Car, Vacation"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                 />
                 <Label htmlFor="goal-target" className="text-sm">Target Amount (Optional)</Label>
                 <Input
                    id="goal-target"
                    type="number"
                    placeholder="e.g., 15000"
                    value={savingsTarget}
                    onChange={(e) => setSavingsTarget(e.target.value)}
                 />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <CardFooter className="pt-6">
              <Button type="submit" className="w-full">Save & Continue</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
