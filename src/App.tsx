
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Investments from "./pages/Investments";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import AddTransaction from "./pages/AddTransaction";
import CreateBudget from "./pages/CreateBudget";
import Recommendations from "./pages/Recommendations";
import BudgetManagement from "./pages/BudgetManagement";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import the ProtectedRoute component
import { useEffect } from 'react'; // Added useEffect import
import { getUserData, updateUserData } from './utils/localStorage'; // Added localStorage utils import
import { calculateTotalPortfolioValue } from './utils/portfolioUtils'; // Added portfolio util import

const queryClient = new QueryClient();

// Changed from concise arrow function to function body with return
const App = () => { 
  // Added useEffect for Portfolio History Snapshot (Phase B.2)
  useEffect(() => {
    const userData = getUserData();
    const lastUpdateTimestamp = userData.lastHistoryUpdateTimestamp;
    const now = new Date();
    let needsUpdate = false;

    if (!lastUpdateTimestamp) {
      needsUpdate = true; // First run
    } else {
      const lastUpdateDate = new Date(lastUpdateTimestamp);
      // Check if the date part is different (simple check for different day)
      if (now.toDateString() !== lastUpdateDate.toDateString()) {
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      console.log("Taking portfolio history snapshot..."); // Log for debugging
      const currentTotalValue = calculateTotalPortfolioValue(userData.investments);
      const newHistoryEntry = { timestamp: now.toISOString(), totalValue: currentTotalValue };
      
      // Ensure portfolioHistory exists and is an array before spreading
      const currentHistory = Array.isArray(userData.portfolioHistory) ? userData.portfolioHistory : [];
      
      // Keep max 366 days (1 year + leap day buffer)
      const updatedHistory = [...currentHistory, newHistoryEntry].slice(-366); 

      updateUserData('portfolioHistory', updatedHistory);
      updateUserData('lastHistoryUpdateTimestamp', now.toISOString());
    }
  }, []); // Empty dependency array ensures this runs once on app mount

  // Added explicit return statement for JSX
  return ( 
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner /> {/* Ensure Sonner is correctly placed */}
        <BrowserRouter>
          <Routes>
          {/* Public route accessible to everyone */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Public Route */}
          <Route path="/" element={<Index />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/investments" element={<ProtectedRoute><Investments /></ProtectedRoute>} />
          {/* Added mt-16 wrapper */}
          <Route path="/chat" element={<ProtectedRoute><div className="mt-16"><Chat /></div></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />

          {/* Quick Action Routes */}
          <Route path="/transactions/add" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
          <Route path="/budgets/create" element={<ProtectedRoute><CreateBudget /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/budget-management" element={<ProtectedRoute><BudgetManagement /></ProtectedRoute>} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
}; // Added missing closing brace for the App component function body

export default App;
