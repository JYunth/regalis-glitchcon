
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="container max-w-lg mx-auto">
          <GlassCard className="text-center py-12">
            <h5 className="text-soft-gold font-medium mb-2">404</h5>
            <h1 className="font-serif text-4xl font-medium text-deep-charcoal mb-4">Page Not Found</h1>
            <p className="text-deep-charcoal/70 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="gold-btn inline-block">
              Return to Home
            </Link>
          </GlassCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
