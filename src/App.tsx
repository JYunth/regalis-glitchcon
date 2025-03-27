
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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

export default App;
