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
  const [isLoading, setIsLoading] = useState(true); // Keep loading state for actual data fetch
  const [error, setError] = useState<string | null>(null); // Add state for error messages

  useEffect(() => {
    // Removed artificial setTimeout wrapper
    const userData = getUserData();
    let updatedHistory = userData.chatHistory; // Start with existing or potentially undefined history

    // Ensure chatHistory exists, initialize if not
    if (!updatedHistory) {
      updatedHistory = [];
      // updateUserData('chatHistory', []); // Decided against saving empty array immediately, will save with greeting if needed.
    }

    // --- Add Initial AI Greeting if history is empty ---
    // Check the potentially initialized updatedHistory
    if (updatedHistory.length === 0) {
      const initialAiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai-init`,
        sender: 'ai',
        message: "Hi there! I'm Regalis AI, your financial assistant. How can I help you manage your finances today?",
        timestamp: new Date().toISOString()
      };
      updatedHistory = [...updatedHistory, initialAiMessage]; // Add to the array
      updateUserData('chatHistory', updatedHistory); // Save updated history with greeting
    }
    // --- End Initial Greeting ---

    setMessages(updatedHistory); // Set state with potentially updated history
    setIsLoading(false); // Set loading false after processing
    // Removed timer cleanup as timer is gone
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Updated fetchAIResponse to return an object indicating success/failure
  const fetchAIResponse = async (systemPrompt: string, history: ChatMessage[]): Promise<{ success: boolean; message: string }> => {
    // Map chat history to Gemini's required format (user/model roles)
    const formattedHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.message }]
    }));

    try {
      // Include dynamic system prompt before the rest of the history
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] }, // Use dynamic prompt
          { role: "model", parts: [{ text: "Understood. I have reviewed the financial summary and am ready to assist." }] }, // Initial model response
          ...formattedHistory // Spread the rest of the conversation history
        ]
      });
      // Ensure response.text exists before trimming
      const responseText = response?.text?.trim();
      if (responseText) {
        return { success: true, message: responseText };
      } else {
        return { success: false, message: 'Sorry, I received an empty response.' };
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Provide a more specific error message if possible, otherwise generic
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, message: `Sorry, I could not process that request: ${errorMessage}` };
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
    // const currentMessage = newMessage; // Store current message before clearing - Removed redundant variable
    setNewMessage('');
    // const currentMessageText = newMessage; // Store current message text before clearing - Removed redundant variable
    // setNewMessage(''); // Already cleared above
    setIsTyping(true);

    // --- Construct Dynamic System Prompt ---
    const userData = getUserData();
    // Ensure settings and expenseBudgets exist before accessing properties
    const currency = userData.settings?.currency ?? 'USD'; // Default currency if not set
    const balance = userData.balance ?? 0;
    const expenseBudgets = userData.expenseBudgets ?? {};
    const financialGoals = userData.financialGoals ?? [];

    const financialSummary = `
Current Balance: ${currency} ${balance.toFixed(2)}
Top Budgets: ${Object.entries(expenseBudgets).slice(0, 3).map(([cat, val]) => `${cat}: ${currency} ${val}`).join(', ')}
Primary Goal: ${financialGoals.length > 0 ? financialGoals[0].type : 'Not set'} 
Risk Tolerance Score: ${userData.riskToleranceScore ?? 'Not set'}
Financial Health Score: ${userData.financialHealthScore ?? 'Not set'}
    `.trim(); // Use trim() to remove leading/trailing whitespace from template literal

    const baseSystemPrompt = "You are Regalis AI, a helpful financial assistant integrated into the Regalis app. Your goal is to provide concise, actionable financial advice based on the user's conversation and their financial summary provided below. Keep responses brief and focused on helping the user manage their finances effectively within the app context.";
    const systemPromptWithData = `${baseSystemPrompt}\n\n--- User Financial Summary ---\n${financialSummary}\n--- End Summary ---`;
    // --- End Prompt Construction ---

    // Pass the dynamic prompt and entire updated history to fetchAIResponse
    const aiResponseResult = await fetchAIResponse(systemPromptWithData, updatedMessages); 
    
    if (aiResponseResult.success) {
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        message: aiResponseResult.message,
        timestamp: new Date().toISOString()
      };
      // Use functional update to ensure state is based on the latest messages
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      updateUserData('chatHistory', [...updatedMessages, aiMessage]); // Update storage with final messages
      setError(null); // Clear any previous error
    } else {
      // Handle error: Display error message in UI instead of adding an AI message
      setError(aiResponseResult.message); 
      // Optionally, add an error marker to the message list if needed, or just rely on the separate error display
      // For simplicity, we'll just show the error state below the messages for now.
    }

    setIsTyping(false);
  };

  return (
    // Use h-full to fill parent main container
    <div className="mx-auto flex flex-col flex-grow h-full">
      {/* Use h-full here too, set padding to none */}
      <GlassCard className="h-full flex-1 flex flex-col overflow-hidden relative min-h-0" padding="none">
        {/* Removed h2 title */}
        {/* Added padding to the scrollable area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4"> 
          {isLoading ? (
            // Improved Skeleton Loader to mimic chat bubbles
            <>
              {[...Array(4)].map((_, i) => (
                <div key={`skel-${i}`} className={`flex animate-pulse ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  {i % 2 !== 0 && <div className="mr-3 h-8 w-8 rounded-full bg-subtle-gray/20"></div>}
                  <div className={`max-w-[70%] rounded-xl p-4 space-y-2 ${i % 2 === 0 ? 'bg-soft-gold/10' : 'bg-subtle-gray/20'}`}>
                    <div className="h-3 bg-current opacity-30 rounded w-3/4"></div>
                    <div className="h-3 bg-current opacity-30 rounded w-1/2"></div>
                  </div>
                  {i % 2 === 0 && <div className="ml-3 h-8 w-8 rounded-full bg-soft-gold/10"></div>}
                </div>
              ))}
            </>
          ) : (
            <>
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                return (
                  // Removed animate-slide-in and animationDelay style for simplicity during conversation
                  <div key={msg.id} className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
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
          {/* Display Error Message if present */}
          {error && (
            <div className="p-4 mb-4 mx-4 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
              <p><strong>Error:</strong> {error}</p>
              {/* Optionally add a retry button here */}
            </div>
          )}
        </div>
        {/* Pinned form to bottom, changed background to solid with top border */}
        <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex items-center space-x-2">
          <Input type="text" className="flex-1" placeholder="Type your financial question..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} disabled={isLoading} />
          <Button type="submit" disabled={!newMessage.trim() || isLoading}>Send</Button>
        </form>
      </GlassCard>
    </div>
  );
};

export default ChatInterface;
