import React, { useState } from 'react';

const WordPractice = ({ word, onClose }) => {
  const [accuracy, setAccuracy] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  // Hàm bắt đầu ghi âm
  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert('Your browser does not support audio recording!');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendAudio(audioBlob);
      };

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setIsRecording(true);
    } catch (err) {
      alert('Could not start recording. Please check your microphone.');
    }
  };

  // Hàm dừng ghi âm
  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    formData.append('word', word);
  
    fetch('http://localhost:8080/v1/api/word/practice', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAccuracy(data.accuracy);
        } else {
          alert('Could not process your speech. Please try again!');
        }
      })
      .catch(() => alert('Error communicating with the server.'));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <h2>Practice Word: {word}</h2>

      {isRecording ? (
        <button
          onClick={stopRecording}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#DC2626',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Stop Recording
        </button>
      ) : (
        <button
          onClick={startRecording}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#1D4ED8',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Start Recording
        </button>
      )}

      {accuracy !== null && <p>Your Accuracy: {accuracy}%</p>}

      <button
        onClick={onClose}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#DC2626',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default WordPractice;
