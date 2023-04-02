import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";

import { ParticlizeImgShaderMaterial } from "../shaders/particlizeImg";
extend ({ParticlizeImgShaderMaterial});

var clock = new THREE.Clock();


export function ParticleImage(props) {
  // Define a texture
  const textureLoader = new THREE.TextureLoader()
  textureLoader.crossOrigin = "Anonymous"
  const texture = textureLoader.load(props.textureURL)

  // const texture = useTexture(require('./../assets/images/Dali.jpeg'));

  // Number of total particles
  const count = 30000;

  const points = useRef();

  const textSize = [1, 1];

  // Create a plane of particles using the parametric equation of a plane
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

      let x = -0.7 + (0.7 * Math.random()) + (0.7 * Math.random())
      let y = -0.7 + (0.7 * Math.random()) + (0.7 * Math.random())
      let z = -0.7 + (0.7 * Math.random()) + (0.7 * Math.random())

      positions.set([x, y, z], i * 3);

    }

    return positions;

  }, [count]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>

      {/* <pointsMaterial color="#FFFFFF" size={0.05} sizeAttenuation /> */}

      <particlizeImgShaderMaterial
        uTexture={texture}
        uTextureSize={textSize}
        ref={points}
      />
    </points>
  );
}