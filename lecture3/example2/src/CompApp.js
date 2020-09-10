import React from "react";

import "./styles.css";
import { useMyState } from "./MyUseState";
import Test1 from "./CompTest1";

export default function App() {
  const [v1, vf1] = useMyState(11, App);
  const [v2, vf2] = useMyState(100, App);
  const [v3, vf3] = useMyState(1000, App);

  return (
    <div className="App">
      <h1 onClick={() => vf1(v1 + 1)}>{v1}</h1>
      <h2 onClick={() => vf2(v2 + 100)}>{v2}</h2>
      <h3 onClick={() => vf3(v3 + 1000)}>{v3}</h3>
      <Test1></Test1>
      <Test1></Test1>
      <Test1></Test1>
    </div>
  );
}
