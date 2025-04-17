import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [lumosActive, setLumosActive] = useState(false);
  const [patronusActive, setPatronusActive] = useState(false);
  const [patronusStarting, setPatronusStarting] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [contentVisible, setContentVisible] = useState(true);
  const patronusAudioRef = useRef(null);

  useEffect(() => {
    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (transcript.includes('lumos')) {
        setLumosActive(true);
        setDarkMode(true);
        setPatronusActive(false);
        setPatronusStarting(false);
      }
      if (transcript.includes('expecto patronum')) {
        setLumosActive(false);
        setPatronusStarting(true);
        setContentVisible(false);
        
        if (patronusAudioRef.current) {
          patronusAudioRef.current.currentTime = 0;
          patronusAudioRef.current.play();
        }
        
        setTimeout(() => {
          setPatronusActive(true);
          setDarkMode(false);
          setPatronusStarting(false);
          setContentVisible(true);
        }, 2000);
      }
      if (transcript.includes('knox')) {
        setDarkMode(true);
        setLumosActive(false);
        setPatronusActive(false);
        setPatronusStarting(false);
      }
    };
    
    recognition.start();
    
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      recognition.abort();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  
  return (
    <>
      <audio ref={patronusAudioRef} src="./sounds/ep.mp3" preload="auto"></audio>
      
      {patronusStarting && (
        <div className="patronus-starting-effect">
          <div className="light-ball"></div>
        </div>
      )}
      
      <div
        className={`background ${darkMode ? 'dark' : ''} ${
          darkMode && !lumosActive && !patronusActive && !patronusStarting ? 'knox-effect' : ''
        }`}
        style={{
          '--cursorX': `${cursorPos.x}px`,
          '--cursorY': `${cursorPos.y}px`,
          opacity: contentVisible ? 1 : 0
        }}
      >
        {lumosActive && <div className="flashlight-effect"></div>}
      </div>
      
      <div className="title" style={{ opacity: contentVisible ? 1 : 0 }}>
        <h1
          className={
            darkMode && lumosActive
              ? 'spotlight-title'
              : !darkMode
              ? 'visible-title'
              : 'hidden-title'
          }
        >
          Welcome to Hogwarts
        </h1>
        
        {patronusActive && (
          <div className="sorting-instructions">
            <p>Eager to uncover which Hogwarts house you truly belong to?</p>
            <button 
              className="sorting-button"
            >
              Start Sorting
            </button>
            <p> Wish to sneak a peek at the enchanted Marauder’s Map:</p>
            <Link to="/map">
            <button 
              className="sorting-button"
            >
             enchanted Marauder’s Map
            </button>
            </Link>
          </div>
        )}
      </div>
      
      {patronusActive && (
        <div className="patronus-effect">
          <div className="patronus-glow"></div>
        </div>
      )}
    </>
  );
}

export default App;