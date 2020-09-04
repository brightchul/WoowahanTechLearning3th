import { createStore } from "./redux.js";

// ?? (Nullish coalescing operator) 는 Node14부터 동작한다.
// 따라서 아래 예제는 Node14이상으로 실행시켜야 제대로 실행이 된다.

const reducer = (state = {}, action = { type: "" }) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: (state.count ?? 0) + 1 };
    case "reset":
      return { ...state, count: action.resetCount ?? 1 };
    default:
      return { ...state };
  }
};

const store = createStore(reducer);
const showConsole = () => console.log(store.getState());
store.subscribe(showConsole);

const storeIncrement = () => store.dispatch({ type: "increment" });
const storeReset = (resetCount) => store.dispatch({ type: "reset", resetCount });

storeIncrement();
storeReset(-10);
storeIncrement();
storeReset(0);
