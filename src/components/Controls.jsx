const Controls = ({ toggle }) => {
  return (
    <div id="controls">
      <button type="button" onClick={toggle}>
        Record
      </button>
      <button type="button">Play</button>
    </div>
  );
};

export default Controls;
