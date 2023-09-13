"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); // Change this URL to your backend server

function App() {
  const [userId, setUserId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const handleUserSelect = () => {
    if (userId) {
      socket.emit('join', userId);
      setConnectedUsers((prevUsers) => [...prevUsers, userId]);
    }
  };

  const handleSendMessage = () => {
    if (userId && selectedUserId && message.trim() !== '') {
      socket.emit('chat', { sender: userId, receiver: selectedUserId, message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <h2>Enter Your User ID</h2>
        <input
          type="text"
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleUserSelect}>Connect</button>
      </div>
      {connectedUsers.length > 0 && (
        <div>
          <h2>Select User ID to Chat With</h2>
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">Select User</option>
            {connectedUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedUserId && (
        <div>
          <h2>Chat with {selectedUserId}</h2>
          <div>
            {chatMessages.map((msg, index) => (
              <p key={index}>{`${msg.sender}: ${msg.message}`}</p>
            ))}
          </div>
          <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
