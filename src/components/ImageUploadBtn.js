import React, { useState, useRef } from 'react';
import * as THREE from 'three';

import '../css/UploadButton.css'

/**
 * FileInput component that allows selecting a file.
 * @param {object} props - The props object.
 * @param {function} props.onFileSelect - Callback function called when a file is selected.
 */
const FileInput = ({ onFileSelect }) => {
  // Create a ref to the file input element
  const fileInputRef = useRef(null);

  // Handle file selection event
  const handleFileSelect = () => {
    const file = fileInputRef.current.files[0];
    onFileSelect(file);
  };

  // Render the file input element and button to select files
  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
      <button onClick={() => fileInputRef.current.click()}>Select Image</button>
    </div>
  );
};

/**
 * FileUploadButton component that allows uploading a file and displaying the loaded texture.
 * @param {object} props - The props object.
 * @param {function} props.loadedTexture - Callback function called when the texture is loaded.
 */
const ImageUploadBtn = ({ loadedTexture }) => {
  // State variable to store the loaded texture
  const [texture, setTexture] = useState(null);

  // Load texture from file
  const loadTexture = (file, onLoad) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      URL.createObjectURL(file),
      texture => {
        // Set the texture state variable
        onLoad(texture);

        // Call the loadedTexture callback function with the loaded texture
        loadedTexture(texture);
      },
      undefined,
      error => console.error('Error loading texture', error),
    );
  };

  // Handle file selection event
  const handleFileSelect = file => {
    loadTexture(file, texture => setTexture(texture));
  };

  // Render the file input button and the loaded texture
  return (
    <div>
      <FileInput onFileSelect={handleFileSelect} />
      {texture && <img className={"loaded-texture"} src={texture.image.src} alt="Selected texture" />}
    </div>
  );
};

export default ImageUploadBtn;