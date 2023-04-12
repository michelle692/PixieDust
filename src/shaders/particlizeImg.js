import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const UNIFORM = 
{ 
  uTexture: new THREE.Texture(),
  uTextSize: new THREE.Vector2(),
}

const VERTEX_SHADER  =
glsl`
  precision mediump float;

  attribute vec3 rgb;
    
  varying vec2 vUv;
  varying vec3 vColor;

  void main() {
    vColor = rgb;
    vUv = vec2(position.x, position.y);
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    gl_PointSize = 10.0;

  }
`

const FRAGMENT_SHADER = 
glsl`
  uniform sampler2D uTexture;
  uniform vec2 uTextSize;

  varying vec2 vUv;
  varying vec3 vColor;
  
  void main() {

    vec3 texture = texture2D(uTexture, vUv).rgb;

    // add gray scale
    // float gray = dot(texture.rgb, vec3(0.6, 0.8, 0.4));
    // vec3 color = vec3(gray);
   
    // if (color.r < 0.05 && color.g < 0.05 && color.b < 0.05) {
    //   color.r = 0.1;
    //   color.g = 0.1;
    //   color.b = 0.1;
      
    // }

    gl_FragColor = vec4(texture, 0.1);
    

    // add color tint
    // vec4 color = vec4( vColor, 1.0 );
    // vec4 texColor = texture2D( uTexture, vUv );
    // gl_FragColor = color * texColor;

    
  }
  
`
export const ParticlizeImgShaderMaterial = shaderMaterial(UNIFORM, VERTEX_SHADER, FRAGMENT_SHADER);