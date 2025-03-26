
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatInterface from '@/components/chat/ChatInterface';
import { loadDemoData } from '@/utils/demoData';
import { useEffect } from 'react';

const Chat = () => {
  // Load demo data when component mounts
  useEffect(() => {
    loadDemoData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-4">
              AI Financial Assistant
            </h1>
            <p className="text-deep-charcoal/70">
              Get personalized financial guidance and insights from our sophisticated AI assistant. Ask any question about your finances, investments, or financial goals.
            </p>
          </div>
          
          <ChatInterface />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
