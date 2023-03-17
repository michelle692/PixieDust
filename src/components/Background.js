import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';

import backgroundColor from './DropDown';

import { GradientShader3Material } from "./../shaders/gradient3";
extend({ GradientShader3Material });


var clock = new THREE.Clock();

export function Background(props) {
  const ref = useRef();
  //TODO: replace this with the actual texture that gets passed in from app
  const texture = useTexture(require('./../assets/images/Dali.jpeg'));

  //receives theme chosen from dropdown. currently in form of string description, ie 'party' and 'mood'
  //will be undefined if no option is chosen. not sure how to set a default without making the dropdown display the default also :/
  const bgc = backgroundColor.theme;
  //testing: console.log(bgc);

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[4, 3, 8, 8]} />
        <gradientShader3Material uTime={clock.getElapsedTime()} uColor1={"purple"} uColor2={"red"} uColor3={"pink"} uTexture={texture} ref={ref} />
      </mesh>
    </group>
  )
}