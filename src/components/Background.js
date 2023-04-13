import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'

import backgroundColor from './DropDown';

import { GradientShader3Material } from "./../shaders/gradient3";
import { ParticlizeImgShaderMaterial } from "./../shaders/particlizeImg";
import { BgGradientShaderMaterial } from '../shaders/bggradient';

extend({ GradientShader3Material });
extend({ ParticlizeImgShaderMaterial });
extend({ BgGradientShaderMaterial });



var clock = new THREE.Clock();

export function Background(props) {
  const ref = useRef();
  
  const texture = props.texture;

  //receives theme chosen from dropdown. currently in form of string description, ie 'party' and 'mood'
  //will be undefined if no option is chosen. not sure how to set a default without making the dropdown display the default also :/
  const bgc = backgroundColor.theme;
  //testing: console.log(bgc);


  var idx = 0;
  for (var i = 0; i < props.freq.length; i++) {
    if (props.freq[i] >= props.freq[idx]) {
      idx = i;
    }
  }
  idx /= 2;

  const colors = [new THREE.Color(0.5, 0.2, 0.2), 
    new THREE.Color(0.604, 0.388, 0.141), 
    new THREE.Color(0.502, 0.502, 0.0), 
    new THREE.Color(0.275, 0.6, 0.565),
    new THREE.Color(0.0, 0.0, 0.459),
    new THREE.Color(0.863, 0.745, 1.0),
    new THREE.Color(0.667, 1.0, 0.765),
    new THREE.Color(0.98, 0.745, 0.831),
    new THREE.Color(1.0, 0.847, 0.694),
    new THREE.Color(1.0, 0.98, 0.784)]

  const color = colors[idx];

  return (
    <group>
      <mesh position={[0.5, 0.5, -1]}>
        <planeGeometry args={[5, 3, 8, 8]} />
        <bgGradientShaderMaterial uFreqArray={props.freq} uTime={clock.getElapsedTime()} uColor1={color} uTexture={texture} ref={ref} />
      </mesh>
      {/* <mesh position={[0, 0, -1]}>
        <planeGeometry args={[3, 2, 8, 8]}/>
        <meshBasicMaterial/>
      </mesh> */}
    </group>
  )
}