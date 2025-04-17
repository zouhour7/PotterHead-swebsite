import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

const HedwigModel = () => {
  const gltf = useGLTF('/models/hedwig.glb');
  const modelRef = useRef();
  const { viewport, mouse } = useThree();
  const [rotationY, setRotationY] = useState(Math.PI / 2);
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
      // Calculate rotation change based on mouse movement (horizontal only)
      const deltaRotationY = (mouse.x - previousMouseX.current) * 2;
      setRotationY(rotationY + deltaRotationY);
    }
   
    // Update previous mouse position (horizontal only)
    previousMouseX.current = mouse.x;
   
    // Apply rotation to the model (Y-axis only)
    if (modelRef.current) {
      modelRef.current.rotation.y = rotationY;
    }
  });
 
  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, -0.5, 0]} // Adjusted position
      scale={[1.1, 1.1, 1.1]} // Increased from 0.5 to 0.8 (60% larger)
    />
  );
};

const Hedwig = () => (
  <div className="hedwig-container">
    <Canvas
      camera={{ position: [2, 2, 2], fov: 50 }}
      gl={{ antialias: true, shadowMap: true }}
    >
      {/* Ambient light for base illumination */}
      <ambientLight intensity={1} color="#ffffff" />
     
      {/* Directional light for main shadows */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
     
      {/* Fill light to reduce harsh shadows */}
      <pointLight
        position={[-3, 5, 3]}
        intensity={2}
        color="#ffffff"
        decay={0.5}
      />
     
      {/* Back light for depth */}
      <pointLight
        position={[0, 3, -5]}
        intensity={1}
        color="#ffffff"
      />
     
      <HedwigModel />
    </Canvas>
  </div>
);

export default Hedwig;