import { Canvas } from '@react-three/fiber'
import { StartButton } from "./components/StartButton";
import { UploadButton } from "./components/UploadButton"
import { Html } from '@react-three/drei'

export function LandingPage(props) {
  return (
      <div>
        <Canvas style={{ height: `100vh`, width: '100vw' }} >
        <StartButton click={props.toggleMicrophone} />
          <Html >
            <UploadButton click={props.uploadImage}/>
          </Html>
          {/* put an upload component here and then pass in the upload image callback function*/}
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
        </Canvas>
        
        
      </div>
  )
}
