import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const EdgeDetection = shaderMaterial(
  //Uniform
  { uTexture: new THREE.Texture() },

  //vertex shader
  glsl`
    precision mediump float;

    varying vec2 vUv;

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
    }
  `,

  //fragment shader
  glsl`
    uniform sampler2D uTexture;
  
    varying vec2 vUv;

    void main() {

      vec3 texture = texture2D(uTexture, vUv).rbg;
      gl_FragColor = vec4(texture, 1.0);
    }
  `
)