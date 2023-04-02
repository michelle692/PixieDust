import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const ParticlizeImgShaderMaterial = shaderMaterial(
  { uTexture: new THREE.Texture(), uTextureSize: new THREE.Vector2(0.7, 0.7)},

  // Vertex Shader
  glsl`
    precision mediump float;

    attribute vec3 offset;

    uniform vec2 uTextureSize;

    varying vec2 vUv;
    varying vec2 vPUv;

    void main() {
      vUv = uv;

      // particle uv
      vec2 puv = offset.xy / uTextureSize;
      vPUv = puv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
      gl_PointSize = 3.0;
    }
  `,

  // Fragment Shader
  glsl`
    uniform sampler2D uTexture;
    
    varying vec2 vUv;
    varying vec2 vPUv;

    void main() {

      vec4 color = vec4(0.0);
      vec2 uv = vUv;
      vec2 puv = vPUv;

      // pixel color
      vec4 colA = texture2D(uTexture, puv);

      vec3 tex = colA.rgb;
      gl_FragColor = vec4(tex, 1.0);

      // vec3 texture = texture2D(uTexture, vUv).rbg;
      // gl_FragColor = vec4(texture, 1.0);
    }
  `
)