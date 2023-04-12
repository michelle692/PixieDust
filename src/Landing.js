import { Canvas } from '@react-three/fiber'
import { DropDown } from './components/DropDown';
import { Warning } from './components/Warning';
import { StartButton } from "./components/StartButton";
import { Html } from '@react-three/drei'
import ImageUploadBtn from './components/ImageUploadBtn';

export function LandingPage(props) {
  return (
      <div>
        <Canvas style={{ height: `100vh`, width: '100vw' }} >
        <StartButton click={props.toggleMicrophone} />
          <Html >
            <ImageUploadBtn loadedTexture={props.loadedTexture}/>
          </Html>
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
        </Canvas>
        <DropDown/>
        <Warning/>
      </div>
  )
}
