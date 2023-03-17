import { Canvas } from '@react-three/fiber'
import { DropDown } from './components/DropDown';
import { StartButton } from "./components/StartButton";
import { UploadButton } from "./components/UploadButton"

export function LandingPage(props) {
  return (
      <div>
        <Canvas style={{ height: `50vh`, width: '50vw' }} >
          <StartButton click={props.toggleMicrophone} />
          {/* put an upload component here and then pass in the upload image callback function*/}
          <pointLight position={[500, 500, 0]} />
          <ambientLight intensity={0.4} />
        </Canvas>
        <UploadButton click={props.uploadImage}/>
        <DropDown/>
        
      </div>
  )
}
