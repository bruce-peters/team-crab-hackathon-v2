import React, { useState } from "react";

const ChatboxWidget = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add the message to the chat history locally
    setChatHistory([...chatHistory, { sender: "user", text: message }]);

    // Clear the input field
    setMessage("");

    // Send the message to the serverY
    fetch("http://localhost:3000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        // Add the server response to the chat history
        setChatHistory([...chatHistory, { sender: "server", text: data.response }]);
      })
      .catch((error) => {
        console.error("Error communicating with server:", error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#343a40",
        color: "white",
        padding: "15px",
        borderRadius: "6px",
        maxWidth: "300px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", textAlign: "center" }}>Chatbox</h3>
      <div
        style={{
          backgroundColor: "#495057",
          padding: "10px",
          borderRadius: "6px",
          flex: "1",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chatHistory.length === 0 ? (
          <p style={{ opacity: "0.7", textAlign: "center" }}>No messages yet</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} style={{ margin: "5px 0" }}>
              <strong>{chat.sender}:</strong> <span>{chat.text}</span>
            </div>
          ))
        )}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: "1",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ced4da",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatboxWidget;
