import { h } from "preact";

import Navbar from "./Navbar";
import Controls from "./Controls";
import VisBox from "./VisBox";

const App = () => (
  <div id="app">
    <Navbar />
    <div id="main">
      <VisBox />
      <Controls />
    </div>
  </div>
);

export default App;
