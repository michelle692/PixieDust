import AudioAnalyzer from './utils/AudioAnalyzer';
import React from "react";

import { LandingPage } from './Landing';
import { PixieDust } from "./PixieDust";
import { FrequencyTable } from "./components/FrequencyTable";

import * as THREE from 'three';

import './css/App.css';


//UI editor
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioData: new Uint8Array(0),
      normalizedData: new Uint8Array(0),
    }

    this.NUM_OF_BINS = 20;
    
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.loop = this.loop.bind(this);

    this.audioAnalyzer = new AudioAnalyzer();

    this.canvas = React.createRef();
    this.textureURL = "https://pixiedust-vip.s3.amazonaws.com/Dali.jpeg";
  }

  // Asks the browser for access to use the microphone. When the user
  // allows, it will internally update its 'audio' variable with 
  // the microphone media device. It will be used by AudioAnalyser.
  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });

    if (audio) {
      this.audioAnalyzer.connect(audio);
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  stopMicrophone() {
    this.audioAnalyzer.disconnect();
    cancelAnimationFrame(this.rafId);
  }

  // Gets called when the user clicks the button on the screen. This is
  // not required. As the developer you can have the mic running 24/7.
  toggleMicrophone() {
    document.body.style.cursor = 'auto';
    if (this.audioAnalyzer.isConnected()) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  uploadImage() {
    // This will be the callback function passed into landing page.
    // This should trigger a browser file upload.
    // If file upload is successful (browser api successfully provides a link or smth) -> save image to the texture variable.
    // If the instance variable is null then this means there is no image, if it is NOT null, then there is an image.
    
    this.textureURL = "https://pixiedust-vip.s3.amazonaws.com/pixie.png"
  }

  loop() {
    if (this.audioAnalyzer.isConnected()) {
      this.audioAnalyzer.analyze();

      const audioData = this.audioAnalyzer.getAudioData();

      const buffer = new ArrayBuffer(this.NUM_OF_BINS);
      const normalizedData = new Uint8Array(buffer);

      const size = audioData.length;
      const bucket_size = Math.floor(size / this.NUM_OF_BINS);

      for (var i = 0; i < this.NUM_OF_BINS; i++) {
        const start = bucket_size * i;

        // in case the last bucket does not divide evenly
        const end = bucket_size * (i + 1) > audioData.length ? audioData.length : bucket_size * (i + 1);

        var sum = 0;
        for (var j = start; j < end; j++) {
          var freq = audioData[j];
          sum += freq;
        }
        var avg = sum / (end - start);

        normalizedData[i] = avg;
      }

      this.setState({ audioData: audioData, normalizedData: normalizedData });
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  // this gets called when the frame needs to be refreshed... DRAW()
  componentDidUpdate() {

    const audioData = this.state.normalizedData;

    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;

    // The actual context that you can draw on, like graphics.
    const context = canvas.getContext('2d');

    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#ffffff';
    context.clearRect(0, 0, width, height);

    let x = 0;
    for (const item of audioData) {
      const h = (item / 255.0) * height;
      const y = height - h;
      context.strokeRect(x, y, sliceWidth, h);
      x += sliceWidth;
    }

    context.stroke();
  }

  render() {
    // if we don't have access to the mic, OR there is no image, keep calling the landing page
    if (!this.audioAnalyzer.isConnected()) {
      return (
        <LandingPage toggleMicrophone={this.toggleMicrophone} uploadImage={this.uploadImage} />
      )
    }
    else {
      return (
        <div style={{ width: "100vw", height: "100vh" }}>
          <PixieDust freqData={this.state.normalizedData} textureURL={this.textureURL} />
          <FrequencyTable canvas={this.canvas} />
        </div>
      );
    }
  }
}

export default App;
