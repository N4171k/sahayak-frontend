import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([{ text: "Hello! I'm Sahayak your safety assistant. How can I help?", isUser: false }]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const recognition = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input.trim(), isUser: true }]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.text, isUser: false }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble responding. Please try again.", isUser: false }]);
    }
  };

  const startRecording = () => {
    if (recognition.current) recognition.current.start();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type or speak your message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button className="voice-btn" onClick={startRecording}>🎙️</button>
      </div>
    </div>
  );
};

export default Chat;