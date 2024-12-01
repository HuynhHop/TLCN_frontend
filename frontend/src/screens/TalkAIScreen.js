import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import Header from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import VirtualPerson from '../components/VirtualPerson';
import '../components/TalkAIScreen.css';

const TalkAIScreen = () => {
  // Retrieve userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Assumes the user object contains an _id property

  const [messages, setMessages] = useState([]);
  const {
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const chatboxRef = useRef(null);

  // Hàm fetch lịch sử trò chuyện từ backend
  const fetchChatHistory = async () => {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:8080/v1/api/chathistory/${userId}`);
        if (response.data.success) {
          const chatHistory = response.data.data;
          setMessages(chatHistory);
        }
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Gọi API lấy lịch sử trò chuyện khi component mount
  useEffect(() => {
    fetchChatHistory();
  }, []); // Chỉ gọi một lần khi component mount

  // Xử lý tin nhắn mới của người dùng
  const fetchAIResponse = async (userMessages) => {
    try {
      const response = await axios.post('http://localhost:8080/v1/api/ai/chat', { messages: userMessages });
      if (response.data.success) {
        const botMessage = response.data.botReply;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: 'bot' },
        ]);

        // Lưu tin nhắn của bot
        if (userId) {
          await axios.post(`http://localhost:8080/v1/api/chathistory/save/${userId}`, {
            message: botMessage,
            sender: 'bot',
          });
        }

        speak(botMessage);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Unable to get response from AI.', sender: 'bot' },
      ]);
    }
  };

  useEffect(() => {
    if (finalTranscript) {
      const userMessage = { text: finalTranscript, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Lưu tin nhắn của user
      if (userId) {
        axios.post(`http://localhost:8080/v1/api/chathistory/save/${userId}`, {
          message: finalTranscript,
          sender: 'user',
        });
      }

      fetchAIResponse([...messages, userMessage]);
      resetTranscript();
    }
  }, [finalTranscript]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      synth.speak(utterance);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, interimResults: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
    setMessages([]);
    if (userId) {
      // Xóa lịch sử trò chuyện của user
      axios.delete(`http://localhost:8080/v1/api/chathistory/${userId}`);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <Header />
      <div className="talkai-container">
        <div className="virtual-person left-person">
          <VirtualPerson type="user" />
        </div>

        <div className="chat-box" ref={chatboxRef}>
          {messages.map((message, index) => (
            <ChatBubble key={index} text={message.text} sender={message.sender} />
          ))}
          {interimTranscript && <ChatBubble text={interimTranscript} sender="interim" />}
        </div>

        <div className="virtual-person right-person">
          <VirtualPerson type="bot" />
        </div>

        <div className="control-buttons">
          <button
            className="listen-button"
            onMouseDown={startListening}
            onMouseUp={stopListening}
          >
            🎙️ Hold to Talk
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkAIScreen;


