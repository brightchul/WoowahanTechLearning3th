# 우아한 테크 러닝 6일차 강의 정리

## 웹팩

### 로더

미들웨어에 해당한다. 웹팩은 처음에 엔트리 포인트에 등록되어 있는 파일을 기준으로 연결되어 있는 파일들을 다 읽은 다음 그것을 로더에 보낸다. 로더는 컨버팅, 입력으로 들어오는 데이터를 조작한다.

### 플러그인

로더보다 더 복잡하다. 웹팩 내부의 로우레벨 기능을 노출시켜준다. 플러그인이 더 많은 작업을 할 수 있다. 플러그인은 로더등을 거치면서 만들어진 데이터들을 후처리를 하는 프로그램이다.

웹팩 로더, 플러그인은 하나의 작업만 하도록 권장 받는다. 그래서 로더, 플러그인은 가짓수가 굉장히 많다.

### 트랜스 파일링

컴파일, 트랜스 파일링은 각각 기계어, 사람을 이해하는 코드를 생성하는 결과물이 차이가 난다.



​    

## Example

```jsx
// App.tsx
import * as React from "react";
import { render } from "react-dom";

// 리액트에서 리덕스를 사용하기 쉽게 함.
import { Provider } from "react-redux";

// applyMiddleware : 미들웨어 관련 함수
import { createStore, applyMiddleware } from "redux";
import { StoreState } from "./types";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";		// 미들웨어다
import App from "./App";

const sagaMiddleware = createSagaMiddleware();
const store: StoreState = createStore(reducer, applyMiddleware(sagaMiddleware));
const rootElement: HTMLElement = document.getElementById("root");

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

```

```jsx
// reducers/index.ts
import { ActionType, getType } from "typesafe-actions";
import { StoreState } from "../types";
import * as Actions from "../actions";

const initializeState: StoreState = {
  monitoring: false,
  success: 0,
  failure: 0
};

export default (
  state: StoreState = initializeState,
  action: ActionType<typeof Actions>
) => {
  switch (action.type) {
    case getType(Actions.fetchSuccess):
      return {
        ...state,
        success: state.success + Math.floor(Math.random() * (100 - 1) + 1)
      };
    case getType(Actions.fetchFailure):
      return {
        ...state,
        failure: state.failure + Math.floor(Math.random() * (2 - 0))
      };
    default:
      console.log(action.type);
      return Object.assign({}, state);
  }
};

```

​    

### typesafe-actions

리듀서에 dispatch하기 위해 action을 만든다.  이 때 세가지 요소가 타입 문자열, 타입속성을 가진 액션 객체, 액션 객체를 리덕스에게 넘기는 디스패치 함수이다. 

액션마다 규격이 다르다. 수백개의 타입을 좀더 간편하게 만들어주는 것이 typesafe-actions이다.

```jsx
import { createAction } from "typesafe-actions";

export const startMonitoring = createAction(
  "@command/monitoring/start",	// 액션 문자열, 타입속성
  resolve => () => resolve()	// 함수, 페이로드에 넣어준다
);

export const stopMonitoring = createAction(
  "@command/monitoring/stop",
  resolve => () => resolve()
);

export const fetchSuccess = createAction(
    "@fetch/success", 
    resolve => () => resolve()
);

export const fetchFailure = createAction(
    "@fetch/failure", 
    resolve => () => resolve()
);

```

​    

### redux-saga

```jsx
// sagas/index.ts
import { fork, all, take, race, delay, put } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import * as Actions from "../actions";

function* monitoringWorkflow() {
  while (true) {
      // 문자열의 액션이 오면 던져줘
      // 이 문자열이 오기 전까지 멈춰있을 것이다.
    yield take(getType(Actions.startMonitoring));

    let isLoop = true;
    while (isLoop) {
      // all : 동시에 여러개의 디스패치를 하고 싶을 때 쓴다
      yield all([
        put({ type: getType(Actions.fetchSuccess) }),
        put({ type: getType(Actions.fetchFailure) })
      ]);

      //  여러 개의 객체중 먼저 도착하는 것을 반환한다
      const { isStop } = yield race({
        // delay : 일종의 프라미스 객체, 딜레이 해준다.
        waitting: delay(200),
          
        // take : 액션을 기다린다.
        isStop: take(getType(Actions.stopMonitoring))
      });

      if (isStop) {
        isLoop = false;
      }
    }
  }
}

// 이것이 App.tsx에 있는 rootSaga이다.
export default function* () {
    // fork : 제네레이터를 받으면 함수를 호출해서 쓴다.
  yield fork(monitoringWorkflow);
}

```

- wrokflow안에 앱의 모든로직이 들어가 있다.

- 사가에 로직을 넣어서 비즈니스 플로우를 UI코드에서 분리할 수 있다.

[[redux-saga 내용보충\]](https://mskims.github.io/redux-saga-in-korean/introduction/BeginnerTutorial.html))





## Q & A

### 공부 조언

자신이 어떤 레이어에 있는지 알고 지금 자신에게 필요한 것을 공부하는게 좋다.

잘 이해안되는 코드에 대해서 추리, 예상을 하는데 그러지 말고 있는 그대로 보는게 더 이해가 빠르다. 그러다 나중에 이면의 메커니즘을 알게 되면 그때 바로 이해하면 된다. 잘못된 생각으로 인해 잘못된 이해를 하는 거 보다는 더 낫다.

​    

### 최적화

1. 먼저 용량을 최대한 줄여본다.
2. 크롬 개발자 도구에서 network 탭에 보면 Waterfall 항목을 보고 순차적으로 나오지 않게, 특정 하나가 길게 일어나지 않게 만든다.
3. 프로파일러를 찍어서 본다.







