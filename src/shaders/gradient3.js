import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const GradientShader3Material = shaderMaterial(
    // Uniform
    { uTime: 0, uColor1: new THREE.Color(0.0, 0.0, 0.0), uColor2: new THREE.Color(0.0, 0.0, 0.0), uColor3: new THREE.Color(0.3, 0.4, 1.0), uTexture: new THREE.Texture() },
    // Vertex Shader
    glsl`
      precision mediump float;
  
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
      }
    `,
    // Fragment shader
    glsl`
      precision mediump float;
  
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uTime;
      uniform sampler2D uTexture;
  
      varying vec2 vUv;
      
      void main() {
        float oscillation = sin( uTime ) * 0.5 + 0.5;
        vec3 texture = texture2D(uTexture, vUv).rgb; // image texture
        //vec2 vUv = gl_FragCoord.xy / 600.0; // uncomment for different gradient
        vec3 mix1 = mix( uColor1,  uColor3,  mix( vUv.y, vUv.x, 0.5 ) ); // swap y and x's to modify 
        vec3 mix2  = mix( uColor2, uColor1,  mix( vUv.x, vUv.y, 0.5 ) );
        vec3 color = mix( mix1, mix2, oscillation );
        vec3 texture2 = color; // dynamic gradient, can add image also
        vec3 texture3 = mix(uColor1, uColor2, mix(vUv.x, vUv.y, 0.5)); // static gradient
        gl_FragColor = vec4( texture2, 1.0 );
      }
    `
);