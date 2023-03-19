import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture } from '@react-three/drei'
import { useRef, Suspense } from 'react';
import { MovingStars } from './components/MovingStars';
import { Frames } from './components/Frames';

export function PixieDust(props) {
  const f = props.freqData[1] / 255.0;
  const f1 = props.freqData[2] / 255.0;
  const f2 = props.freqData[4] / 255.0;
  const f3 = props.freqData[8] / 255.0;
  const f4 = props.freqData[10] / 255.0;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 10, near: 0.1 }} onpmrthographic={true}>
        <Suspense fallback={null}>

          <Frames textureURL={props.textureURL} freq={f} freq1={f1} freq2={f2} freq3={f3} freq4={f4} />
          <MovingStars scale={0.1} move={f} />

          {/* <OrbitControls /> */}
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  )
}