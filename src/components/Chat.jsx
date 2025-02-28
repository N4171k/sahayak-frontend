import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './Chat.css';

const Chat = () => {
  // State management
  const [messages, setMessages] = useState([{ 
    text: "Hello! I'm Sahayak your safety assistant. How can I help?", 
    isUser: false 
  }]);
  const [input, setInput] = useState('');
  
  // Refs for auto-scrolling and speech recognition
  const chatEndRef = useRef(null);
  const recognition = useRef(null);

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech recognition setup
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

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error", event);
      };
    }
  }, []);

  // Function to start voice recording
  const startRecording = () => {
    if (recognition.current) {
      recognition.current.start();
    }
  };

  // Auto-speak bot messages using SpeechSynthesis
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Only speak if the last message is from the bot
      if (!lastMessage.isUser && 'speechSynthesis' in window) {
        // Remove asterisks (and other markdown symbols if needed) from the text
        const plainText = lastMessage.text.replace(/\*/g, '');
        const utterance = new SpeechSynthesisUtterance(plainText);
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [messages]);

  // Message handling: send user message and fetch response from API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    // Add the user message to the conversation
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5800/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.text, isUser: false }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "⚠️ Connection issue. Please try again later.", 
        isUser: false 
      }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <div className="message-content">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
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
