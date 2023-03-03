import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";


export function BasicSphere(props) {

  const points = useRef();

  return (
    <points ref={points}>
      <sphereGeometry args={[0.5, 48, 48]} />
      <pointsMaterial color="#5786F5" size={0.05} sizeAttenuation />
    </points>
  )
}