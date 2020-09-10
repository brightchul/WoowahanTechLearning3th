import React from "react";
import { useMyState } from "./MyUseState";

export default function Test1() {
  const [v4, vf4] = useMyState(22, Test1);
  const [v5, vf5] = useMyState(222, Test1);
  const [v6, vf6] = useMyState(2222, Test1);
  return (
    <>
      <p onClick={() => vf4(v4 + 1)}>{v4}</p>
      <p onClick={() => vf5(v5 + 100)}>{v5}</p>
      <p onClick={() => vf6(v6 + 1000)}>{v6}</p>
    </>
  );
}
