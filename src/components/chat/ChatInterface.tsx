
import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import { ChatMessage, getUserData, updateUserData } from '@/utils/localStorage';

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load chat history
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const userData = getUserData();
      setMessages(userData.chatHistory);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Create user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    // Update messages and save to localStorage
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    updateUserData('chatHistory', updatedMessages);
    setNewMessage('');
    
    // Simulate AI typing response
    setIsTyping(true);
    setTimeout(() => {
      // Create AI response
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        message: generateAIResponse(newMessage),
        timestamp: new Date().toISOString()
      };
      
      // Update messages and save to localStorage
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      updateUserData('chatHistory', finalMessages);
      setIsTyping(false);
    }, 1500);
  };

  // Generate a simple AI response based on user message
  const generateAIResponse = (message: string): string => {
    const responses = [
      "Based on your financial profile, I recommend maintaining your current investment strategy while increasing your monthly savings by 5%.",
      "I've analyzed your spending patterns, and you could optimize your budget by reducing subscription services by approximately $45 per month.",
      "Your investment portfolio is well-balanced. Consider allocating an additional 2% to sustainable investments, which align with your preferences.",
      "Your current savings rate is excellent. If you maintain this pace, you'll reach your retirement goal 3 years ahead of schedule.",
      "I've identified an opportunity to refinance your mortgage at a lower rate, potentially saving you $230 per month.",
      "Your emergency fund currently covers 4.2 months of expenses. I recommend gradually increasing this to 6 months for optimal financial security."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Quick response suggestions
  const suggestions = [
    "How can I save more?",
    "Where am I overspending?",
    "Investment recommendations?",
    "How to reduce my taxes?",
    "When can I retire?"
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-12rem)]">
      <GlassCard className="flex-1 flex flex-col overflow-hidden">
        <h2 className="font-serif text-2xl text-deep-charcoal mb-6">Financial Assistant</h2>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`animate-pulse max-w-[80%] h-20 rounded-xl ${
                    i % 2 === 0 ? 'ml-auto bg-soft-gold/10' : 'bg-subtle-gray/20'
                  }`}
                ></div>
              ))}
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div 
                  key={msg.id}
                  className={`mb-4 animate-slide-in ${
                    msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`max-w-[80%] p-4 rounded-xl ${
                    msg.sender === 'user' 
                      ? 'bg-soft-gold/10 text-deep-charcoal' 
                      : 'glass text-deep-charcoal'
                  }`}>
                    <p>{msg.message}</p>
                    <p className="text-right text-xs text-deep-charcoal/50 mt-1">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* AI typing indicator */}
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
        
        {/* Quick response suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              className="text-sm border border-soft-gold text-soft-gold px-3 py-1.5 rounded-full hover:bg-soft-gold hover:text-white transition-all duration-300"
              onClick={() => setNewMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border border-subtle-gray bg-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-soft-gold"
            placeholder="Type your financial question..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="gold-btn-small"
            disabled={!newMessage.trim() || isLoading}
          >
            Send
          </button>
        </form>
      </GlassCard>
    </div>
  );
};

export default ChatInterface;
