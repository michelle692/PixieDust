import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';

import backgroundColor from './DropDown';

import { GradientShader3Material } from "./../shaders/gradient3";
import { ParticlizeImgShaderMaterial } from "./../shaders/particlizeImg";

extend({ GradientShader3Material });
extend({ ParticlizeImgShaderMaterial });




var clock = new THREE.Clock();

export function Background(props) {
  const ref = useRef();
  
  const textureLoader = new THREE.TextureLoader()
  textureLoader.crossOrigin = "Anonymous"
  const texture = textureLoader.load(props.textureURL)

  //receives theme chosen from dropdown. currently in form of string description, ie 'party' and 'mood'
  //will be undefined if no option is chosen. not sure how to set a default without making the dropdown display the default also :/
  const bgc = backgroundColor.theme;
  //testing: console.log(bgc);

  return (
    <group>
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[5, 3, 8, 8]} />
        <gradientShader3Material uFreqArray={props.freq} uTime={clock.getElapsedTime()} uColor1={"cyan"} uColor2={"red"} uColor3={"pink"} uTexture={texture} ref={ref} />
      </mesh>
      {/* <mesh position={[0, 0, -1]}>
        <planeGeometry args={[3, 2, 8, 8]}/>
        <meshBasicMaterial/>
      </mesh> */}
    </group>
  )
}