/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import './Result.css';

const sortingHatSpeeches = {
  gryffindor: `Ahhh… yes, I see it now...

A heart that does not run from thunder,
a spirit that rises when the room falls silent,
and a fire that burns brightest when the path grows dark...

You are not merely brave when victory is certain.
No, no… your courage appears when doubt is loud,
when fear knocks,
and still you choose to stand...

You belong where bold souls gather,
where honor is sharpened like a sword,
and where legends are not waited for…
Yes... yes, there is no mistake.
Your house is… Gryffindor!!`,
  ravenclaw: `Mmm… interesting… very interesting indeed.

Behind your eyes, there is a library of questions.
Not simple curiosity, no… something deeper.
A mind that searches, compares, wonders, and refuses to accept the first answer it is given.

You are drawn to mysteries,
to patterns hidden beneath ordinary things,
to the quiet power of knowledge.

Some chase glory with noise.
You, however, understand that true power often whispers.

A clever mind… for sure!
a seeker of truth…

Your house is… Ravenclaw!!`,
  slytherin: `Ohhh… now this is a sharp one.

I sense hunger here.
Not for food, no, no…
but for greatness.

You look at the world and do not merely ask,
“What is possible?”
You ask,
“Why not more?”

There is strategy in you.
A will that refuses to remain small.
A mind that understands timing, influence, and the art of turning obstacles into stairs.

Some may fear ambition.
But in the right hands, ambition builds kingdoms, changes histories, and bends fate itself.

Yes… you are not here to follow the road.

You are here to own it…
Your house is… Slytherin!!`,
  hufflepuff: `Ahhh… warm… steady… true.

Here is a soul that understands something many forget:
greatness is not always loud.
Sometimes it is found in patience, kindness, and standing beside others when the crowd disappears.

You carry a rare strength.
The strength to care.
The strength to remain fair.
The strength to work, to endure, and to protect what matters.

You are the friend others remember.
The hand that helps.
The heart that does not abandon.

Where others seek the spotlight,
you become the foundation.

And foundations, my dear one,
hold castles together.

Your house is… Hufflepuff!!`,
};

const getStoredHouse = () => {
  const selectedHouse = sessionStorage.getItem('selectedHouse');
  if (selectedHouse) return selectedHouse;

  const storedResult = sessionStorage.getItem('sortingResult');
  if (!storedResult) return null;

  try {
    return JSON.parse(storedResult).finalHouse;
  } catch {
    return null;
  }
};

const getSortingHatVoice = (voices) => {
  const voicePreferences = ['google uk english male', 'microsoft george', 'daniel', 'arthur', 'oliver', 'ryan', 'male'];

  return voices
    .map((voice) => {
      const name = voice.name.toLowerCase();
      const lang = voice.lang.toLowerCase();
      const isBritish = lang === 'en-gb' || name.includes('british') || name.includes('uk');
      const preferenceScore = voicePreferences.reduce((score, preference, index) => {
        return name.includes(preference) ? score + voicePreferences.length - index : score;
      }, 0);

      return {
        voice,
        score: (isBritish ? 100 : 0) + preferenceScore,
      };
    })
    .sort((first, second) => second.score - first.score)[0]?.voice;
};

const speakSortingHat = (text) => {
  const dramaticText = text.replace(/\n{2,}/g, '... ').replace(/\n/g, ', ');
  const utterance = new SpeechSynthesisUtterance(dramaticText);
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = getSortingHatVoice(voices) || voices[0];

  utterance.voice = preferredVoice;
  utterance.lang = 'en-GB';
  utterance.rate = 0.66;
  utterance.pitch = 0.38;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const HatModel = () => {
  const gltf = useGLTF('/models/hat.glb');
  const hatRef = useRef(null);
  const { mouse } = useThree();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      child.castShadow = true;
      child.receiveShadow = true;
      child.material.emissive = new THREE.Color('#1b1007');
      child.material.emissiveIntensity = 0.18;
      child.material.needsUpdate = true;
    });
  }, [gltf.scene]);

  useFrame(() => {
    if (!hatRef.current) return;

    hatRef.current.rotation.y += (mouse.x * 0.65 - hatRef.current.rotation.y) * 0.08;
    hatRef.current.rotation.x += (-mouse.y * 0.28 - hatRef.current.rotation.x) * 0.08;
    hatRef.current.position.y = -0.35 + Math.sin(Date.now() * 0.0015) * 0.05;
  });

  return (
    <primitive
      ref={hatRef}
      object={gltf.scene}
      position={[0, -0.35, 0]}
      scale={[1.7, 1.7, 1.7]}
    />
  );
};

const Result = () => {
  const location = useLocation();
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    const house = location.state?.finalHouse || getStoredHouse();
    const speech = sortingHatSpeeches[house];

    if (!speech || hasSpokenRef.current || !('speechSynthesis' in window)) return undefined;

    const speakOnce = () => {
      if (hasSpokenRef.current) return;

      hasSpokenRef.current = true;
      speakSortingHat(speech);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      speakOnce();
      return () => window.speechSynthesis.cancel();
    }

    const fallbackTimer = window.setTimeout(speakOnce, 500);
    window.speechSynthesis.addEventListener('voiceschanged', speakOnce);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.speechSynthesis.removeEventListener('voiceschanged', speakOnce);
      window.speechSynthesis.cancel();
    };
  }, [location.state]);

  return (
    <main className="result-page">
      <div className="result-hat-stage">
        <Canvas
          camera={{ position: [0, 0.25, 4.6], fov: 42 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <ambientLight intensity={2.1} color="#fff3dc" />
          <hemisphereLight args={['#fff5d5', '#403020', 2.2]} />
          <directionalLight position={[0, 4, 5]} intensity={3.8} color="#ffdca0" />
          <directionalLight position={[-4, 2, -2]} intensity={3.2} color="#8fc8ff" />
          <directionalLight position={[4, 2, -2]} intensity={3.2} color="#ffd166" />
          <spotLight
            position={[0, 3.5, 3.8]}
            angle={0.55}
            penumbra={0.75}
            intensity={4.5}
            color="#fff0c7"
          />
          <pointLight position={[0, 1.1, 2.4]} intensity={2.4} color="#ffe0a3" />
          <HatModel />
        </Canvas>
      </div>
    </main>
  );
};

useGLTF.preload('/models/hat.glb');

export default Result;
