import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';

import { GradientShader3Material } from "./../shaders/gradient3";
extend({ GradientShader3Material });


var clock = new THREE.Clock();

export function Background(props) {
  const ref = useRef();
  //TODO: replace this with the actual texture that gets passed in from app
  const texture = useTexture(require('./../assets/images/Dali.jpeg'));
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[4, 3, 8, 8]} />
        <gradientShader3Material uFreqArray={props.freq} uTime={clock.getElapsedTime()} uColor1={"cyan"} uColor2={"red"} uColor3={"pink"} uTexture={texture} ref={ref} />
      </mesh>
    </group>
  )
}