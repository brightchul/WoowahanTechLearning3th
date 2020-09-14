# useState를 만들어보자

- 의도 : useState를 이해하기 위해 MyUseState를 만들어 보자



### 간단한 설명

- WeapMap을 활용해서 약한 참조를 이용한 map 데이터 관리를 시도했다.
- 원래는 arguments의 callee, caller를 이용해서 외부에서 함수 컴포넌트 받는 것 없이 구현하고 싶었으나 그렇게 구현하니 strict모드에서 그렇게 쓰지 말라고 알림이 계속 떠서 해당 함수 컴포넌트를 받는 것으로 변경했다.
- 리액트 내부에 아마도 강제로 업데이트 하는 방법이 있었을 텐데 먼저 찾아본 바로는 함수 컴포넌트에서는 오직 상태, 속성 변경으로만 리렌더링이 일어나고 그외 리렌더링은 리액트 내부에서 동작하는 것 같았다. 그래서 임의로 forceupdate를 ReactDOM.render로 그냥 만들었다.
- 어떻게 동작하는지 파악하기 위해 목업으로 간단하게 구현해보는 것이기 때문에 참고용이다.



### 예제 실행법

#### 로컬 실행

1. example2 폴더에 들어온다.
2. `npm install` 을 한다.
3. `npm start` 를 한다.

#### 온라인 실행

[[CodeSandbox실행]](https://codesandbox.io/s/gracious-shockley-kbtj1?file=/src/MyUseState.js)

