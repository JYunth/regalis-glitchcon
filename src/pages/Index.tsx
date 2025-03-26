
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import Getstarted from '@/components/GetStarted';
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 flex items-center justify-center bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h5 className="text-soft-gold font-medium mb-4 animate-fade-in">FINANCIAL CLARITY & ELEGANCE</h5>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-deep-charcoal leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Wealth management with minimalist sophistication
            </h1>
            <p className="text-deep-charcoal/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Experience financial clarity through thoughtful design and intelligent insights. Regalis brings an air of refinement to your financial journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Getstarted />
              <button className="border border-subtle-gray text-deep-charcoal/80 font-medium px-6 py-3 rounded-md hover:bg-subtle-gray/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-warm-beige">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-4">
              Financial clarity through elegant design
            </h2>
            <p className="text-deep-charcoal/70 max-w-2xl mx-auto">
              Every aspect of Regalis is crafted to provide a refined experience that simplifies your financial life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="animate-fade-in" style={{ animationDelay: '0.1s' }} hoverEffect>
              <div className="h-12 w-12 rounded-full bg-soft-gold/10 flex items-center justify-center mb-6">
                <span className="text-soft-gold font-serif text-xl">01</span>
              </div>
              <h3 className="font-serif text-xl mb-3 text-deep-charcoal">Elegant Dashboard</h3>
              <p className="text-deep-charcoal/70">
                A beautiful, minimalist interface that presents your financial information with clarity and sophistication.
              </p>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{ animationDelay: '0.2s' }} hoverEffect>
              <div className="h-12 w-12 rounded-full bg-soft-gold/10 flex items-center justify-center mb-6">
                <span className="text-soft-gold font-serif text-xl">02</span>
              </div>
              <h3 className="font-serif text-xl mb-3 text-deep-charcoal">Intelligent Budgeting</h3>
              <p className="text-deep-charcoal/70">
                Track your spending with sophisticated visualizations and personalized insights to optimize your finances.
              </p>
            </GlassCard>
            
            <GlassCard className="animate-fade-in" style={{ animationDelay: '0.3s' }} hoverEffect>
              <div className="h-12 w-12 rounded-full bg-soft-gold/10 flex items-center justify-center mb-6">
                <span className="text-soft-gold font-serif text-xl">03</span>
              </div>
              <h3 className="font-serif text-xl mb-3 text-deep-charcoal">AI Financial Assistant</h3>
              <p className="text-deep-charcoal/70">
                Receive tailored financial guidance and insights from our sophisticated AI assistant.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
      
      {/* Investment Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h5 className="text-soft-gold font-medium mb-4">GROW YOUR WEALTH</h5>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-6">
                Investment strategies with minimalist elegance
              </h2>
              <p className="text-deep-charcoal/70 mb-8">
                Regalis presents investment opportunities with clarity and refinement. Our curated selection of investment options is designed to align with your financial goals while maintaining a focus on simplicity and transparency.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-soft-gold/10 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2 w-2 bg-soft-gold rounded-full"></div>
                  </div>
                  <p className="text-deep-charcoal/80">Personalized investment recommendations based on your risk profile</p>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-soft-gold/10 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2 w-2 bg-soft-gold rounded-full"></div>
                  </div>
                  <p className="text-deep-charcoal/80">Clean, elegant visualizations of portfolio performance</p>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-soft-gold/10 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2 w-2 bg-soft-gold rounded-full"></div>
                  </div>
                  <p className="text-deep-charcoal/80">Thoughtful strategies for long-term wealth growth</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <GlassCard className="relative z-10 transform md:translate-x-12">
                <div className="bg-soft-gold/10 p-3 rounded-lg inline-block mb-4">
                  <span className="text-soft-gold font-serif">Portfolio Overview</span>
                </div>
                <h3 className="font-serif text-2xl mb-6 text-deep-charcoal">Balanced Growth Strategy</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-deep-charcoal/70">Stocks</span>
                    <span className="text-deep-charcoal font-medium">60%</span>
                  </div>
                  <div className="h-2 bg-subtle-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-soft-gold rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-deep-charcoal/70">Bonds</span>
                    <span className="text-deep-charcoal font-medium">30%</span>
                  </div>
                  <div className="h-2 bg-subtle-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-soft-gold rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-deep-charcoal/70">Alternatives</span>
                    <span className="text-deep-charcoal font-medium">10%</span>
                  </div>
                  <div className="h-2 bg-subtle-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-soft-gold rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <div>
                    <p className="text-deep-charcoal/60 text-sm">Expected Annual Return</p>
                    <p className="text-deep-charcoal font-serif text-2xl">8.4%</p>
                  </div>
                  <div>
                    <p className="text-deep-charcoal/60 text-sm">Risk Level</p>
                    <p className="text-deep-charcoal font-serif text-2xl">Medium</p>
                  </div>
                </div>
              </GlassCard>
              
              <div className="absolute inset-0 bg-soft-gold/5 rounded-2xl transform md:-translate-x-12 md:translate-y-12 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-warm-beige">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-6">
              Begin your refined financial journey
            </h2>
            <p className="text-deep-charcoal/70 mb-8">
              Experience financial management with minimalist elegance. Regalis brings clarity and sophistication to your wealth management experience.
            </p>
            <Link to="/dashboard" className="gold-btn inline-block">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
