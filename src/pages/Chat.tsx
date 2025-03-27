
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ChatInterface from '@/components/chat/ChatInterface';
import ChatBar from '@/components/chat/ChatBar';
import { loadDemoData } from '@/utils/demoData';
import { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    loadDemoData();
  }, []);

  const handleClearChat = () => {
    localStorage.removeItem('userData');
    window.location.reload();
  };

  return (
    // Use h-screen here
    <div className="h-screen flex flex-col">
      <Navbar />
      <ChatBar onClearChat={handleClearChat} />
      {/* Make main expand and handle potential overflow */}
      <main className="flex-1 overflow-hidden"> {/* Use flex-1 and overflow-hidden */}
        <ChatInterface />
      </main>
    </div>
  );
};

export default Chat;
