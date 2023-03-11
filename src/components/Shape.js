import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'

import { useTexture } from '@react-three/drei';
import { GradientShader3Material } from "./../shaders/gradient3";
extend({ GradientShader3Material });

var clock = new THREE.Clock();

export function Shape(props) {
  const ref = useRef();
  //TODO: replace this with the actual texture that gets passed in from app
  const texture = useTexture(require('./../assets/images/Dali.jpeg'));
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[1.2, 1.2, 8, 8]} />
        <gradientShader3Material uTime={clock.getElapsedTime()} uColor1={"blue"} uColor2={"red"} uColor3={"pink"} uTexture={texture} ref={ref} />
      </mesh>
    </group>
  )
}