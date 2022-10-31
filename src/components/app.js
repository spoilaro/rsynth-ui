import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as Tone from "tone";

import Navbar from "./Navbar";

let audioCtx = null;
// let analyser;
// let bufferLength;
// let dataArray;
let source;

const App = () => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        await audioCtx.audioWorklet.addModule("../processors/testProcessor.js");
        source = audioCtx.createMediaStreamSource(stream);

        const testProcessor = new AudioWorkletNode(audioCtx, "testProcessor");

        source.connect(testProcessor).connect(audioCtx.destination);

        //
        // analyser = audioCtx.createAnalyser();
        // analyser.fftSize = 2048;
        //
        // bufferLength = analyser.frequencyBinCount;
        // dataArray = new Uint8Array(bufferLength);
        // analyser.getByteTimeDomainData(dataArray);
        //
        // source.connect(analyser);
      });
  }, []);

  const startSound = async () => {
    // Add processor
    await audioCtx.audioWorklet.addModule("../processors/testProcessor.js");
    const oscillator = new OscillatorNode(audioCtx);
    const bypasser = new AudioWorkletNode(audioCtx, "testProcessor");
    oscillator.connect(bypasser).connect(audioCtx.destination);
    oscillator.start();
  };

  return (
    <div id="app">
      <Navbar />
      <div id="main">
        <button onClick={startSound}>START</button>
      </div>
    </div>
  );
};

export default App;
