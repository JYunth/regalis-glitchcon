import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { loadDemoData } from '@/utils/demoData';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const developerModeEnabled = localStorage.getItem('developerModeEnabled') === 'true';
  let isOnboardingComplete = false;

  if (developerModeEnabled) {
    loadDemoData();
    return <>{children}</>; // Bypass onboarding and render children
  }

  try {
    const profileString = localStorage.getItem('userFinancialProfile');
    if (profileString) {
      const profile = JSON.parse(profileString);
      // Check specifically for the onboardingComplete flag
      if (profile && profile.onboardingComplete === true) {
        isOnboardingComplete = true;
      }
    }
  } catch (error) {
    console.error("Error reading onboarding status from local storage:", error);
    // Treat errors as onboarding not complete for safety
    isOnboardingComplete = false;
  }

  if (!isOnboardingComplete) {
    // Redirect them to the /onboarding page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they
    // complete onboarding, though we won't implement that redirect-after-onboarding logic now.
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  return <>{children}</>; // Render the children (the protected page) if onboarding is complete
};

export default ProtectedRoute;
