"use client"
import React, { useState, useRef, useEffect } from 'react';

// --- Icons for the chatbot ---
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hello! Main aapka AI assistant hoon. Main aapki kya sahayata kar sakta hoon?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatboxRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage = { from: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            const newBotMessage = { from: 'bot', text: data.reply };
            setMessages(prev => [...prev, newBotMessage]);

        } catch (error) {
            const errorMessage = { from: 'bot', text: "Sorry, kuch problem aa gayi. Thodi der baad try karein." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-5 w-[350px] h-[500px] bg-[#191c24] rounded-lg shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'scale-100' : 'scale-0'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-black/20 rounded-t-lg">
                    <h3 className="text-white font-bold">Barber Bot</h3>
                    <button onClick={() => setIsOpen(false)}><CloseIcon /></button>
                </div>

                {/* Messages */}
                <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <p className={`max-w-[80%] p-3 rounded-lg ${msg.from === 'user' ? 'bg-red-700 text-white' : 'bg-gray-700 text-white'}`}>
                                {msg.text}
                            </p>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <p className="max-w-[80%] p-3 rounded-lg bg-gray-700 text-white">
                                <span className="animate-pulse">...</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 bg-black/20 rounded-b-lg flex items-center">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button type="submit" className="bg-red-700 px-4 py-2 rounded-r-md hover:bg-red-800">
                        <SendIcon />
                    </button>
                </form>
            </div>

            {/* Floating Button to open chat */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 bg-red-700 p-4 rounded-full shadow-lg hover:bg-red-800 transition-transform duration-200 hover:scale-110 z-50"
            >
                <ChatIcon />
            </button>
        </>
    );
};

export default Chatbot;