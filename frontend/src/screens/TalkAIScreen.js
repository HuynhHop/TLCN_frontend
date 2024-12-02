import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import Header from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import VirtualPerson from '../components/VirtualPerson';
import '../components/TalkAIScreen.css';

const TalkAIScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Retrieve userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Assumes the user object contains an _id property

  const [chatBackground, setChatBackground] = useState('#f0f0f0'); // Mặc định là màu xám nhạt

  const changeBackground = (bgColor) => {
    setChatBackground(bgColor);
  };

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
      // Kiểm tra xem nội dung có phải tiếng Anh hay không (tuỳ chọn)
      const isEnglish = /^[a-zA-Z0-9\s.,!?'"-]*$/.test(finalTranscript);

      if (!isEnglish) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Please speak in English.', sender: 'bot' },
        ]);
        resetTranscript();
        return;
      }
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
      setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      synth.speak(utterance);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };
  

  const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: 'en-US', // Chỉ sử dụng ngôn ngữ tiếng Anh
    });
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

        <div className="chat-box" ref={chatboxRef} style={{ backgroundColor: chatBackground }}>
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
          <button 
            className="stop-speaking-button" 
            onClick={stopSpeaking}
            disabled={!isSpeaking}
          >
            Stop Bot Speaking
          </button>
          <button className="reset-button" onClick={handleReset}>
            Clear
          </button>
        </div>
        <div className="background-select">
          <label htmlFor="background-color" className="background-label">Choose Background Color:</label>
          <select
            id="background-color"
            value={chatBackground}
            onChange={(e) => changeBackground(e.target.value)}
            className="background-dropdown"
          >
            <option value="#f0f0f0">Default</option>
            <option value="#d1e7dd">Green</option>
            <option value="#fde2e4">Pink</option>
            <option value="#ffffff">White</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TalkAIScreen;


