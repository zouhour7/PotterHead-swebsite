import React from 'react';
import PropTypes from 'prop-types';
import './intro.css';
import Hedwig from './Hedwig';
import Letter from './letter';

const Intro = ({ onReady }) => {
  return (
    <div className="intro-page">
      <div className="header-container">
        <div className="title-with-owl">
          <div className="hedwig-wrapper">
            <Hedwig />
          </div>
          <h1 className="intro-title">Harry Potter</h1>
        </div>
      </div>
      <div className="content-layout">
        <div className="intro-container">
          <p className="intro-instructions">
            Welcome, dear wizard, to the enchanting realm of Harry Potter!
          </p>
          <p className="intro-instructions">
            Here, you shall embark on a journey filled with wonder, spells, and magical moments beyond imagination.
          </p>
          <p className="intro-instructions">
            To ensure the most immersive experience, heed these sacred enchantments:
          </p>
          <p className="intro-instructions">
            ✨ Lumos! Ignite the tip of your wand and reveal the words destined to be read.
          </p>
          <p className="intro-instructions">
            🌙 Nox! Cloak your surroundings in darkness as your wand's glow fades into the night.
          </p>
          <p className="intro-instructions">
            🦌 Expecto Patronum! Summon an eternal light, banishing the shadows once and for all.
          </p>
          <p className="intro-instructions">
            Before you venture further, we urge you to master these spells. Only then shall your journey truly begin! 🔮
          </p>
          <button className="intro-button" onClick={onReady}>
            I'm Ready!
          </button>
        </div>
        <div className="letter-container">
          <Letter />
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {
  onReady: PropTypes.func.isRequired,
};

export default Intro;