import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import { ChatMessage, getUserData, updateUserData } from '@/utils/localStorage';
import { GoogleGenAI } from "@google/genai";

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
      userData.chatHistory = [];
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
      return response.text.trim();
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorry, I could not process that request.';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    updateUserData('chatHistory', updatedMessages);
    setNewMessage('');
    setIsTyping(true);

    const aiResponse = await fetchAIResponse(newMessage);
    
    const aiMessage: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      sender: 'ai',
      message: aiResponse,
      timestamp: new Date().toISOString()
    };
    
    const finalMessages = [...updatedMessages, aiMessage];
    setMessages(finalMessages);
    updateUserData('chatHistory', finalMessages);
    setIsTyping(false);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-12rem)]">
      <GlassCard className="flex-1 flex flex-col overflow-hidden">
        <h2 className="font-serif text-2xl text-deep-charcoal mb-6">Financial Assistant</h2>
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`animate-pulse max-w-[80%] h-20 rounded-xl ${i % 2 === 0 ? 'ml-auto bg-soft-gold/10' : 'bg-subtle-gray/20'}`}></div>
              ))}
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={msg.id} className={`mb-4 animate-slide-in ${msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`max-w-[80%] p-4 rounded-xl ${msg.sender === 'user' ? 'bg-soft-gold/10 text-deep-charcoal' : 'glass text-deep-charcoal'}`}>
                    <p>{msg.message}</p>
                    <p className="text-right text-xs text-deep-charcoal/50 mt-1">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4 animate-fade-in">
                  <div className="glass p-4 rounded-xl">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-soft-gold rounded-full animate-soft-bounce"></div>
                      <div className="h-2 w-2 bg-soft-gold rounded-full animate-soft-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-soft-gold rounded-full animate-soft-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input type="text" className="flex-1 border border-subtle-gray bg-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-soft-gold" placeholder="Type your financial question..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} disabled={isLoading} />
          <button type="submit" className="gold-btn-small" disabled={!newMessage.trim() || isLoading}>Send</button>
        </form>
      </GlassCard>
    </div>
  );
};

export default ChatInterface;
