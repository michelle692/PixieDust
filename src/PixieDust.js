import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture, PerspectiveCamera } from '@react-three/drei'
import { useRef, Suspense } from 'react';
import { MovingStars } from './components/MovingStars';
import { Frames } from './components/Frames';
import { ParticleSphere } from './components/ParticleSphere';
import { BasicSphere } from './components/BasicSphere';

import { Background } from './components/Background';
import { ParticleTest } from './components/Test';
import { ParticlePlane } from './components/ParticlePlane';


export function PixieDust(props) {
  const freqArray = props.freqData;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2], zoom: 550}} orthographic={true}>
        <Suspense fallback={null}>
    
          <Background textureURL={props.textureURL} freq={freqArray}/>
          {/* <BasicSphere />
          <ParticleSphere count={15000} /> */}
          {/* <ParticleTest textureURL={props.textureURL}/> */}

          <ParticlePlane texture={props.texture}/>


          {/* <MovingStars scale={0.1} move={0} /> */}

          <OrbitControls />
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  )
}