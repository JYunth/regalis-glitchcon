import React from 'react';
import { Button } from "@/components/ui/button"

interface ChatBarProps {
    onClearChat: () => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ onClearChat }) => {
    return (
        // Removed mt-4
        <div className="flex items-center justify-between bg-gray-100 p-4"> 
            <span className="text-lg font-semibold">Financial assistant</span>
            <Button variant="ghost" className="mr-2" onClick={onClearChat}>
                Clear Chat
            </Button>
        </div>
    );
};

export default ChatBar;
