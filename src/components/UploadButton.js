// General imports
import React, { useState, useEffect } from "react";
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react';

// Fonts and Shader imports
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import inconsolata from './../assets/fonts/Inconsolata_Regular.json'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { TextWaveShaderMaterial } from "./../shaders/textwave";

import { Upload } from "upload-js"

extend({ TextGeometry });
extend({ TextWaveShaderMaterial });

const upload = Upload({ apiKey: "free" })

/* CSS */
const buttonStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgb(209,213,219)",
  borderRadius: ".5rem",
  boxSizing: "border-box",
  color: "#111827",
  fontFamily: "Roboto",
  fontSize: ".5rem",
  fontWeight: "600",
  lineHeight: "1.25rem",
  padding: ".2rem .5rem",
  textDecoration: "none #D1D5DB solid",
  textDecorationThickness: "auto",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  bottom: "3vh",
  left: "2vw",

  "&:hover": {
    backgroundColor: "rgb(249,250,251)"
  }
}

export function UploadButton(props){
  const hiddenFileInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const handleClick = () => {
    hiddenFileInput.current.click()
    props.click()
  }

  return (
    <>
      <button
        onClick={handleClick}
        style={buttonStyle}
      >Upload</button>

      <input
        type="file"
        ref={hiddenFileInput}
        style={{display: 'none'}}
        onChange={async(event) => {
          console.log(event.target.files[0])
          const file = await upload.uploadFile(event.target.files[0])
          console.log(file.fileUrl)
          props.click(file.fileUrl)
        }}
      />
    </>
  )
}