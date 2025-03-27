
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ChatInterface from '@/components/chat/ChatInterface';
import ChatBar from '@/components/chat/ChatBar';
// Removed loadDemoData import
import { updateUserData } from '@/utils/localStorage'; // Import updateUserData
// Removed useEffect import

const Chat = () => {
  // Removed useEffect hook that loaded demo data

  const handleClearChat = () => {
    updateUserData('chatHistory', []); // Clear only chat history
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
