import * as THREE from 'three'
import { useRef, Suspense } from 'react';
import { extend, useFrame } from '@react-three/fiber'

import { EdgeDetection } from '../shaders/edgedetection';
extend({EdgeDetection})


var clock = new THREE.Clock();

export function TestBox(props) {
  const ref = useRef();
  //TODO: replace this with the actual texture that gets passed in from app
  const texture = props.textureID;
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[1, 1, 8, 8]} />
        <edgeDetection uTexture={texture} ref={ref}/>
      </mesh>
    </group>

  )
}