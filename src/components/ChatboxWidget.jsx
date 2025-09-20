import React, { useState } from "react";

const ChatboxWidget = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = message;
    setMessage("");
    setIsLoading(true);

    // Add the user message to the chat history
    const newUserMessage = { sender: "user", text: userMessage, timestamp: new Date() };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      // Send the message to the server
      const response = await fetch("http://localhost:3000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: userMessage }),
      });
      
      const data = await response.json();
      
      // Add the server response to the chat history
      const serverMessage = { 
        sender: "assistant", 
        text: data.text || "I received your message!", 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, serverMessage]);
    } catch (error) {
      console.error("Error communicating with server:", error);
      // Add error message to chat
      const errorMessage = { 
        sender: "assistant", 
        text: "Sorry, I'm having trouble connecting right now. Try again later!", 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 h-fit hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
        <h3 className="text-xl font-semibold text-slate-800">AI Assistant</h3>
        <div className="flex-1"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 h-64 overflow-y-auto mb-4 border">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">Start a conversation!</p>
            <p className="text-slate-400 text-xs mt-1">Ask me anything about your courses</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  chat.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                }`}>
                  <p className="text-sm">{chat.text}</p>
                  <p className={`text-xs mt-1 ${
                    chat.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {chat.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-800 rounded-lg rounded-bl-none px-4 py-2 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-slate-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || message.trim() === ""}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-1"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatboxWidget;
