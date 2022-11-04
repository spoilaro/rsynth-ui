import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as Tone from "tone";

import Navbar from "./Navbar";

let audioCtx = null;
// let analyser;
// let bufferLength;
// let dataArray;
let source;
let input_stream;

const App = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      input_stream = stream;
    });
  }, []);

  const startSound = async () => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // await audioCtx.audioWorklet.addModule("../processors/testProcessor.js");
    await audioCtx.audioWorklet.addModule("../processors/VanillaReverb.js.js");
    source = audioCtx.createMediaStreamSource(input_stream);

    const testProcessor = new AudioWorkletNode(audioCtx, "vanilla-reverb");

    source.connect(testProcessor).connect(audioCtx.destination);
  };

  const stopSound = async () => {
    await audioCtx.stop();
  };

  const toggleSound = async () => {
    audioCtx ? await stopSound() : await startSound();
  };

  return (
    <div id="app">
      <Navbar />
      <div id="main">
        <button onClick={toggleSound}>START</button>
      </div>
    </div>
  );
};

export default App;
