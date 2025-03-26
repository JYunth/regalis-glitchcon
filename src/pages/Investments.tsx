
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import InvestmentCard from '@/components/investments/InvestmentCard';
import { Investment, getUserData } from '@/utils/localStorage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { loadDemoData } from '@/utils/demoData';

const Investments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [projectionData, setProjectionData] = useState<{year: string, value: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load demo data
    loadDemoData();
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      const userData = getUserData();
      setInvestments(userData.investments);
      
      // Generate projection data for the chart
      setProjectionData(generateProjectionData());
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate investment projection data for the next 10 years
  const generateProjectionData = () => {
    const startingAmount = 50000; // Initial investment amount
    const annualContribution = 10000; // Annual contribution
    const projectedReturn = 0.08; // 8% average annual return
    
    const data = [];
    let currentValue = startingAmount;
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i <= 10; i++) {
      const year = (currentYear + i).toString();
      
      data.push({
        year,
        value: Math.round(currentValue)
      });
      
      // Calculate next year's value with compound interest plus contribution
      currentValue = currentValue * (1 + projectedReturn) + annualContribution;
    }
    
    return data;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 text-sm">
          <p className="font-medium">Year {label}</p>
          <p className="text-soft-gold font-serif text-lg">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Investment Opportunities
          </h1>
          
          {/* Projection Chart */}
          <GlassCard className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-xl text-deep-charcoal">Wealth Projection</h3>
                <p className="text-deep-charcoal/70 text-sm mt-1">
                  Estimated growth of a $50,000 investment with $10,000 annual contributions
                </p>
              </div>
              <div className="bg-soft-emerald/10 rounded-full px-3 py-1">
                <span className="text-soft-emerald font-medium">8% Annual Return</span>
              </div>
            </div>
            
            {isLoading ? (
              <div className="h-64 bg-subtle-gray/20 animate-pulse rounded-md"></div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projectionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#DADADA" opacity={0.3} />
                    <XAxis dataKey="year" tick={{ fill: '#2D2D2D', opacity: 0.7 }} />
                    <YAxis 
                      tickFormatter={(value) => `$${value/1000}k`} 
                      tick={{ fill: '#2D2D2D', opacity: 0.7 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#E4CDA7" 
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#E4CDA7' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
          
          {/* Investment Strategy Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-soft-gold/10 flex items-center justify-center mb-4">
                <span className="text-soft-gold font-serif text-xl">01</span>
              </div>
              <h3 className="font-serif text-xl mb-2 text-deep-charcoal">Diversified Portfolio</h3>
              <p className="text-deep-charcoal/70 text-sm">
                A carefully balanced mix of investments across different asset classes to manage risk and optimize returns over time.
              </p>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="h-12 w-12 rounded-full bg-soft-gold/10 flex items-center justify-center mb-4">
                <span className="text-soft-gold font-serif text-xl">02</span>
              </div>
              <h3 className="font-serif text-xl mb-2 text-deep-charcoal">Long-Term Growth</h3>
              <p className="text-deep-charcoal/70 text-sm">
                Focus on sustainable long-term growth through quality investments rather than short-term market timing or speculation.
              </p>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="h-12 w-12 rounded-full bg-soft-gold/10 flex items-center justify-center mb-4">
                <span className="text-soft-gold font-serif text-xl">03</span>
              </div>
              <h3 className="font-serif text-xl mb-2 text-deep-charcoal">Tax Efficiency</h3>
              <p className="text-deep-charcoal/70 text-sm">
                Strategic investment placement to minimize tax impact and maximize after-tax returns while building long-term wealth.
              </p>
            </GlassCard>
          </div>
          
          {/* Investment Opportunities */}
          <h2 className="font-serif text-2xl font-medium text-deep-charcoal mb-6">
            Recommended Investments
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-subtle-gray/20 animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map((investment, index) => (
                <InvestmentCard 
                  key={investment.id} 
                  investment={investment} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investments;
