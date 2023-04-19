import * as THREE from 'three'
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const UNIFORM = 
{ 
  uTexture: new THREE.Texture(),
  uTextSize: new THREE.Vector2(),
  uFreqArray: new Uint8Array(20),
  uBase: 0.0
}

const VERTEX_SHADER  =
glsl`
  precision mediump float;

  attribute vec3 rgb;

  uniform float uBass;
  uniform sampler2D uTexture;
  uniform float[20] uFreqArray;
    
  varying vec2 vUv;
  varying vec3 vColor;
  varying float noise;
  varying vec3 fNormal;

  void main() {
    // vColor = rgb;
    vUv = vec2(position.x, position.y);
    float bass = (uFreqArray[8]) / 255.0;
    float mid = (uFreqArray[4])/ 255.0;

    vec4 color = texture2D(uTexture, vUv);
    float disp = (color.b ) * bass;

    float d = (color.r ) * mid;
    
    vec3 displacedPosition = position + vec3(disp, 0.0, 0.0);
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);

    gl_PointSize = 3.0;

  }
`

const FRAGMENT_SHADER = 
glsl`
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uTextSize;

  varying vec2 vUv;
  varying vec3 vColor;

  varying float noise;
  varying vec3 fNormal;
  
  void main() {

    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, 1.0);

    

    // add color tint
    // vec4 color = vec4( vColor, 1.0 );
    // vec4 texColor = texture2D( uTexture, vUv );
    // gl_FragColor = color * texColor;

    
  }
  
`
export const ParticlizeImgShaderMaterial = shaderMaterial(UNIFORM, VERTEX_SHADER, FRAGMENT_SHADER);