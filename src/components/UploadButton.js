// General imports
import React, { useState, useEffect } from "react";
import { extend } from '@react-three/fiber'
import { useRef } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import { Upload } from "upload-js"

extend({ TextGeometry });

// maybe shouldn't keep api key here, fine for now
const upload = Upload({ apiKey: "public_12a1xzc9sZbFCGnuUjHhzBCNkEAs" });

/* Button CSS */
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
          const file = await upload.uploadFile(event.target.files[0])
          props.click(file.fileUrl)
        }}
      />
    </>
  )
}