// ?? (Nullish coalescing operator) 는 Node14부터 동작한다.
// 따라서 아래 예제는 Node14이상으로 실행시켜야 제대로 실행이 된다.
// index.js
import { createStore, makeFreezedObj, Action } from "./redux.js";

// 비즈니스 로직을 외부에서 주입한다.
const reducer = (state = makeFreezedObj(), action) => {
  switch (action.type) {
    case "increment":
      return makeFreezedObj(state, { count: (state.count ?? 1) + 1 });
    case "reset":
      return makeFreezedObj(state, { count: action.resetValue ?? 1 });
    default:
      throw Error("등록되어 있지 않는 action입니다.");
  }
};

const state = createStore(reducer);
state.subscribe(() => console.log(state.getState().count));

console.log(state.getState());
state.dispatch(new Action("increment"));
state.dispatch(new Action("reset", { resetValue: 10 }));
