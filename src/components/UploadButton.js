// General imports
import React, { useState, useEffect } from "react";
import { extend } from '@react-three/fiber'
import { useRef } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import '../css/UploadButton.css'

import { Upload } from "upload-js"

extend({ TextGeometry });

// maybe shouldn't keep api key here, fine for now
const upload = Upload({ apiKey: "public_12a1xzc9sZbFCGnuUjHhzBCNkEAs" });

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
        className="Button"
      >Upload</button>

      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
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