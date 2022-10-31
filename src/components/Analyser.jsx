import { useState, useEffect } from "preact/hooks";

const Analyser = ({ stream }) => {
  const [audioData, setAudioData] = useState(new Uint8Array());

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  const bufferLength = analyser.fftSize;
  setAudioData(new Uint8Array(bufferLength));
  analyser.getByteTimeDomainData(audioData);

  console.log(audioData);

  return <div id="analyser">Analyser</div>;
};

export default Analyser;
