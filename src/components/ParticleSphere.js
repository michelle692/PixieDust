import * as THREE from 'three'
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Particlize } from '../shaders/particlize';
extend ({ Particlize });

var clock = new THREE.Clock();

export function ParticleSphere(props) {
  const { count } = props;
  const radius = 1;

  const points = useRef();

  // Create a sphere of particles using the parametric equation of a sphere
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt((Math.random() - 0.5)) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    
    return positions;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <particlize
        uTime={clock.getElapsedTime()}
        radius={radius}
        ref={points}
      />
    </points>
  )
}