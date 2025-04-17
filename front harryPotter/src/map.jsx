import { useState, useEffect } from 'react';
import './Map.css';
import './animations.css';

const Map = () => {
  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      
      if (transcript.includes('i solemnly swear that i\'m up to no good')) {
        setMapActive(true);
      }
      if (transcript.includes('mischief managed')) {
        setMapActive(false);
      }
    };

    recognition.start();

    return () => {
      recognition.abort();
    };
  }, []);

  const handleManualToggle = () => setMapActive(!mapActive);

  return (
    <div className="main-content">
      <div className={`map-base ${mapActive ? 'active' : ''}`}>
        <div className="footsteps footsteps-1">
          <div className="footstep left"></div>
          <div className="footstep right"></div>
          <div className="scroll-name">
            <p>Severus Snape</p>
          </div>
        </div>
        
        <div className="footsteps footsteps-2">
          <div className="footstep left"></div>
          <div className="footstep right"></div>
          <div className="scroll-name">
            <p>Harry Potter</p>
          </div>
        </div>

        <div className="map-flap flap--1">
          <div className="map-flap__front"></div>
          <div className="map-flap__back"></div>
        </div>
        <div className="map-flap flap--2">
          <div className="map-flap__front"></div>
          <div className="map-flap__back"></div>
        </div>

        <div className="map-side side-1">
          <div className="front" style={{ "--image": "url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/8.png')" }}></div>
          <div className="back"></div>
        </div>
        <div className="map-side side-2">
          <div className="front" style={{ "--image": "url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/18.png')" }}></div>
          <div className="back"></div>
        </div>
        <div className="map-side side-3">
          <div className="front" style={{ "--image": "url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/7.png')" }}></div>
          <div className="back"></div>
        </div>
        <div className="map-side side-4">
          <div className="front" style={{ "--image": "url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/10.png')" }}></div>
        </div>
        <div className="map-side side-5">
          <div className="front" style={{ "--image": "url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/6.png')" }}></div>
          <div className="back"></div>
        </div>
        <div className="map-side side-6">
          <div className="front" style={{ "--image": "url('https://meowlivia.s3.us-east-2.amazonaws.com/codepen/map/11.png')" }}></div>
          <div className="back"></div>
        </div>
      </div>

      <div className="instructions">
        <p> Say "I solemnly swear that I'm up to no good" to open</p>
        <p>Say "Mischief Managed!" to close</p>
        <button className="toggle-map" onClick={handleManualToggle}>Open/Close Map</button>
      </div>
    </div>
  );
};

export default Map;