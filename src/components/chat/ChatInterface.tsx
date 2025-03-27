import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import { ChatMessage, getUserData, updateUserData } from '@/utils/localStorage';
import { GoogleGenAI } from "@google/genai";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = getUserData();
      // Ensure chatHistory exists, initialize if not
      if (!userData.chatHistory) {
        userData.chatHistory = [];
        // Optionally save the initialized empty array back to storage
        // updateUserData('chatHistory', []); 
      }
      setMessages(userData.chatHistory);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const fetchAIResponse = async (message: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ parts: [{ text: message }] }]
      });
      // Ensure response.text exists before trimming
      return response?.text?.trim() ?? 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorry, I could not process that request.';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Correct userMessage definition
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    updateUserData('chatHistory', updatedMessages);
    const currentMessage = newMessage; // Store current message before clearing
    setNewMessage('');
    setIsTyping(true);

    const aiResponse = await fetchAIResponse(currentMessage); // Use stored message
    
    const aiMessage: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      sender: 'ai',
      message: aiResponse,
      timestamp: new Date().toISOString()
    };
    
    // Use functional update to ensure state is based on the latest messages
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    updateUserData('chatHistory', [...updatedMessages, aiMessage]); // Update storage with final messages
    setIsTyping(false);
  };

  return (
    // Use h-full to fill parent main container
    <div className="mx-auto flex flex-col flex-grow h-full">
      {/* Use h-full here too, set padding to none */}
      <GlassCard className="h-full flex-1 flex flex-col overflow-hidden relative min-h-0" padding="none">
        {/* Removed h2 title */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {isLoading ? (
            <div className="space-y-4 ">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`animate-pulse max-w-[80%] h-20 rounded-xl ${i % 2 === 0 ? 'ml-auto bg-soft-gold/10' : 'bg-subtle-gray/20'}`}></div>
              ))}
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`mb-4 animate-slide-in flex ${isUser ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    {!isUser && (
                      <Avatar className="mr-3 h-8 w-8">
                        <AvatarImage src="/ai.png" alt="AI Avatar" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[80%] p-4 rounded-xl ${isUser ? 'bg-soft-gold/60 text-deep-charcoal' : 'bg-subtle-gray/20 text-deep-charcoal'}`}>
                      <p>{msg.message}</p>
                      <p className="text-right text-xs text-deep-charcoal/50 mt-1">{formatTime(msg.timestamp)}</p>
                    </div>
                    {isUser && (
                      <Avatar className="ml-3 h-8 w-8">
                        <AvatarImage src="/user.jpg" alt="User Avatar" />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start mb-4 animate-fade-in">
                  <Avatar className="mr-3 h-8 w-8">
                    <AvatarImage src="/ai.png" alt="AI Avatar" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="glass p-4 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-soft-gold rounded-full animate-soft-bounce"></div>
                      <div className="h-2 w-2 bg-soft-gold rounded-full animate-soft-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-soft-gold rounded-full animate-soft-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-sm text-deep-charcoal/80">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        {/* Pinned form to bottom, added padding inside form */}
        <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 bg-white/50 backdrop-blur-lg flex items-center space-x-2">
          <Input type="text" className="flex-1" placeholder="Type your financial question..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} disabled={isLoading} />
          <Button type="submit" disabled={!newMessage.trim() || isLoading}>Send</Button>
        </form>
      </GlassCard>
    </div>
  );
};

export default ChatInterface;
