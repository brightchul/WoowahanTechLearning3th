export const createStore = (reducer) => {
  let state;
  const listeners = new Set();

  return {
    getState: () => ({ ...state }),
    subscribe: (fn) => listeners.add(fn),
    dispatch: (action) => (state = reducer(state, action)) && listeners.forEach((fn) => fn()),
  };
};

// 앱하나에 스토어 하나, 중앙 스토어
// 스토어는 그냥 객체이다.

// 리덕스의 기본 컨셉은 아래로 내려가는 것을
// 변경을 할수 없게 한다. immutable 하게. 컴포넌트가 상태를 직접적으로 바꾸면
// 다른 컴포넌트는 그 변경에 영향을 받는다.

// 1. 컴포넌트는 스토어의 상태를 바꾸지 못한다.

// export function createStore(reducer) {
//     let state;
//     const listeners = [];
//     const getState = () => ({...state});
//     const dispatch = action => {
//         state = reducer(state, action);
//         listeners.forEach(fn => fn());
//     }

//     const subscribe = fn => {
//         listeners.push(fn);
//     }

//     // 객체 하나를 리턴한다.
//     // state = reducer(state, {
//     //     type: 'abc'
//     // });

//     return {
//         getState,
//         dispatch,
//         subscribe
//     }
// }

// 상태를 바꾸는 코드는 앱을 만드는 개발자가 만든다.
// 함수로, 상태를 바꾸는 코드로 전달하는데
// 이것을 리듀서라고 한다.

// 상태가 바뀔떄 ㅣ리듀서 함수를 호출하면
// 현재 상태를 리듀서 함수에 넘겨준다.
