
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, useTexture, Float, Environment } from '@react-three/drei';
import { useMediaQuery } from '../hooks/useMediaQuery';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t / 1.5) / 2;
      mesh.current.rotation.y = Math.sin(t / 1) / 2;
      mesh.current.rotation.z = Math.sin(t / 1.5) / 2;
      mesh.current.position.y = Math.sin(t / 1.5) / 4;
      
      // Add pulsing effect when hovered
      if (hovered) {
        mesh.current.scale.x = 1.5 + Math.sin(t * 2) * 0.1;
        mesh.current.scale.y = 1.5 + Math.sin(t * 2) * 0.1;
        mesh.current.scale.z = 1.5 + Math.sin(t * 2) * 0.1;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere 
        ref={mesh} 
        args={[1, 64, 64]} 
        position={[0, 0, 0]} 
        scale={1.5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color="#FF7A00"
          attach="material"
          distort={hovered ? 0.6 : 0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={hovered}
        />
      </Sphere>
    </Float>
  );
};

// Add particles in the background
const Particles = ({ count = 200 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (!mesh.current) return;
    
    const temp = new THREE.Object3D();
    const positions = [];
    
    for (let i = 0; i < count; i++) {
      // Random position within viewport
      const x = (Math.random() - 0.5) * viewport.width * 3;
      const y = (Math.random() - 0.5) * viewport.height * 3;
      const z = (Math.random() - 0.5) * 10;
      
      temp.position.set(x, y, z);
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
      
      positions.push(x, y, z);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count, viewport]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    const temp = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 3;
      const y = (Math.random() - 0.5) * viewport.height * 3;
      const z = (Math.random() - 0.5) * 10;
      
      // Slowly rotate and move particles
      temp.position.set(
        x + Math.sin(time * 0.1 + i) * 0.5,
        y + Math.cos(time * 0.1 + i) * 0.5,
        z
      );
      temp.rotation.x = Math.sin(time * 0.1 + i);
      temp.rotation.y = Math.cos(time * 0.1 + i);
      temp.updateMatrix();
      
      mesh.current.setMatrixAt(i, temp.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#FF7A00" transparent opacity={0.4} />
    </instancedMesh>
  );
};

const ThreeDModel = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Create a fallback in case Three.js fails to render
  return (
    <div className="absolute inset-0 -z-10 opacity-80 pointer-events-none">
      <ErrorBoundary fallback={<div className="hidden">3D model failed to load</div>}>
        <Canvas 
          className="!absolute inset-0" 
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true
          }}
          dpr={[1, 2]} // Improved resolution on high DPI screens
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 5, 15]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF7A00" />
          
          <group>
            <AnimatedSphere />
            <Particles count={isMobile ? 100 : 200} />
          </group>
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 + 0.5}
          />
          <Environment preset="city" />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

// Simple error boundary component to prevent the app from crashing if 3D rendering fails
class ErrorBoundary extends React.Component<{ 
  children: React.ReactNode; 
  fallback: React.ReactNode;
}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error) {
    console.error("ThreeDModel failed to render:", error);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

export default ThreeDModel;
