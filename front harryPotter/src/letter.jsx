import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

const LetterModel = () => {
  const gltf = useGLTF('/models/letter.glb');
  const modelRef = useRef();
  const { viewport, mouse } = useThree();
  const [rotationY, setRotationY] = useState(Math.PI / 4);
  const [isDragging, setIsDragging] = useState(false);
  const previousMouseX = useRef(0);

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useFrame(() => {
    if (isDragging && modelRef.current) {
      // Calculate rotation change based on mouse movement
      const deltaRotationY = (mouse.x - previousMouseX.current) * 2;
      setRotationY(rotationY + deltaRotationY);
    } else if (modelRef.current) {
      // Gentle floating animation when not being dragged
      modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
    
    // Update previous mouse position
    previousMouseX.current = mouse.x;
    
    // Apply rotation to the model
    if (modelRef.current) {
      modelRef.current.rotation.y = rotationY;
    }
  });
  
  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, -0.2, 0]} 
      scale={[1.1, 1.1, 1.1]} // Smaller scale for the letter
      rotation={[0, 0, 0]}
    />
  );
};

const Letter = () => (
  <div className="letter-wrapper">
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, shadowMap: true }}
    >
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.8} color="#ffffff" />
      
      {/* Directional light for main shadows */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Fill light to reduce harsh shadows */}
      <pointLight
        position={[-3, 2, 3]}
        intensity={0.8}
        color="#ffe0a3"
        decay={0.5}
      />
      
      {/* Back light for depth and parchment glow effect */}
      <pointLight
        position={[0, 0, -5]}
        intensity={0.6}
        color="#ffcc88"
      />
      
      <LetterModel />
    </Canvas>
  </div>
);

// Preload the model
useGLTF.preload('/models/letter.glb');

export default Letter;