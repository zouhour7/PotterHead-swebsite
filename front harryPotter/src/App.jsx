import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import patronusSound from '../sounds/ep.mp3';

function App() {
  const [lumosActive, setLumosActive] = useState(false);
  const [patronusActive, setPatronusActive] = useState(false);
  const [patronusStarting, setPatronusStarting] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [contentVisible, setContentVisible] = useState(true);
  const [speechFallbackVisible, setSpeechFallbackVisible] = useState(false);
  const patronusAudioRef = useRef(null);

  const revealPatronus = useCallback(() => {
    setLumosActive(false);
    setPatronusStarting(true);
    setContentVisible(false);

    if (patronusAudioRef.current) {
      patronusAudioRef.current.currentTime = 0;
      patronusAudioRef.current.play().catch((error) => {
        console.warn('Patronus audio playback failed:', error);
      });
    }

    setTimeout(() => {
      setPatronusActive(true);
      setDarkMode(false);
      setPatronusStarting(false);
      setContentVisible(true);
      setSpeechFallbackVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechFallbackVisible(true);
      console.warn('Speech recognition is not supported in this browser.');
      return undefined;
    }

    const recognition = new SpeechRecognition();
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
        revealPatronus();
      }
      if (transcript.includes('knox')) {
        setDarkMode(true);
        setLumosActive(false);
        setPatronusActive(false);
        setPatronusStarting(false);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setSpeechFallbackVisible(true);
      }
      console.warn('Speech recognition error:', event.error);
    };
    
    try {
      recognition.start();
    } catch (error) {
      setSpeechFallbackVisible(true);
      console.warn('Speech recognition failed to start:', error);
    }
    
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      recognition.abort();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [revealPatronus]);

  
  return (
    <>
      <audio ref={patronusAudioRef} src={patronusSound} preload="auto"></audio>
      
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
            <Link to="/sorting">
            <button 
              className="sorting-button"
            >
              Start Sorting
            </button>
            </Link>
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

        {speechFallbackVisible && !patronusActive && !patronusStarting && (
          <button className="voice-fallback-button" type="button" onClick={revealPatronus}>
            Cast Expecto Patronum
          </button>
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
