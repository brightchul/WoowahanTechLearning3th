# 우아한 테크 러닝 3기 1일차



## 개발 스택에 대한 고민

- 개발자가 기술을 선택했을 때 왜 그것을 선택했는지 제대로 고민하는 경우가 드물다.
- 기술을 선택하는데 있어서 사람, 팀, 기타 제약 사항들 속에서 적정기술을 어떻게 선택하는게 가장 좋을지 고민해 보고 생각할 줄 아는 개발자가 되자.
- 예전에는 바닥부터 만들었지만 지금은 많은 도구들이 나왔고 생산성 향상에 많은 도움을 준다. 그래서 고민의 관점이 과거와 많이 달라져 있으며 프로그래밍의 학습 대부분이 이러한 도구 사용법을 익히는 것이 되었다.



## 강의에서 다룰 키워드

- 상태 (state) : 상태를 어떻게 관리하고 다룰 것인가
- 환경 (env) : 다양한 실행환경에 대해 어떻게 반응할 것인가 (런타임, 개발 환경, 인원 등)
- 제품 (prod) : 개발적인 측면, 서비스로 나가는 제품 측면 등에서 생각해볼 문제
- 목표 (Mission) : 많은 도구를 조합해서 만들어나가는 제품이 해결할 목표
- 코드 (Quality) : 어떻게 퀄리티 좋은 코드를 만들수 있을까?
- 상대적 (E=mc2) : 모든 것들이 상대적인데 이해도에 따라 적용이 다른 측면이 있다



### 도구 

##### 1 측면

- "어떤 문제를 이렇게 해결할 거야"에 대한 베스트 솔루션이다.
- 제작자가 의도한 그 흐름을 벗어나면 사용하기가 힘들 수 있다.
- 그 목표를 이해하고 잘 사용하는 것을 베스트 프랙티스라고 한다.



##### 2 측면

- 사용하는 관점에서는 도구의 제작자의 의도와 다르게 다른 사용법을 발견해 낼 수 있다.

- 도구를 얼마나 자유롭게 사용할지 아는 것도 결국 사람인 것이다.

- 서로 상이한 사용방법의 차이가 협업에 갈등을 생기게 될 수도 있다.



### blueprint.js

- 나온지는 좀 되었고 UI가 올드하기는 하지만 기본적으로 타입스크립트로 되어있다.
- 타입스크립트 기능을 잘 활용하면서 컴포넌트 방식으로 잘 만들어져 있다.



## CRA (create-react-app)

create-react-app은 리액트 관련 개발환경을 쉽게 설정할 수 있도록 도와주는 툴이다. 



### CRA의 장점

- 리액트의 초기 세팅을 쉽게 할 수 있다.



### CRA의 단점

- 그 외에는 단점이다.
- CRA가 지원하지 않는 세팅을 만들 때 상당히 어렵다. 
- 다양한 환경에 대한 대응이 어렵다. 
  - 다양환 환경이란 로컬, 서버연동, 베타, 운영 환경, 실제 운영 환경, 테스트 프로덕션 환경, 베타, 데브 등의 환경을 말한다. 
  - CRA의 리액트 스크립트로 하면 로컬, 프로덕션 2가지로 밖에 할 수가 없다.
- 프로덕션용으로는 CRA보다는 웹팩으로 세팅을 하는게 좋다. 
- Eject라는 옵션이 있지만 구조가 복잡하여 유지보수에 좋지 않다.



### 가볍게 시작하는 학습의 단점

- getting started를 보고 가볍게 시작하고, 막히면 구글링하는 패턴은 데미지를 준다.
- 스펙 문서, 공식홈의 문서를 읽어보는게 좋다. 
- 왜 이렇게 쓰는지 의도를 파악하고 사용법만 얕게 파악하지 않도록 한다.



### 타입스크립트

- 명시적인 것과 암묵적인 것이 있는데 암묵적인 것보다는 명시적인 것이 더 좋다.
- 자바스크립트도 암묵적인 형태에서 명시적으로 표현할 수 있는 부분으로 확장해 나가고 있다.
- js의 프리미티브 타입의 장점은 일반화되어 있어 다양한 부분, 분야에 사용할 수 있다는 점이다.
- 이러한 타입에 좀더 의미를 부여하고 싶을때 type alias를 적용해볼 수 있다.
- type alias, interface는 비슷하지만 서로 의미와 의도가 조금씩 다르다. 잘 파악해 보자.

```bash
// 타입스크립트 + 리액트 CRA조합
// yarn 이용
yarn create react-app my-app --template typescript

// npm 이용
npm install -g create-react-app
craete-react-app my-app --template typescript

// npx 이용
npx create-react-app my-app --template typescript

```



##### 타입스크립트의 2가지 요소

  1. 컴파일 타임에만 작동하는 요소 (type alias, generic, interface, ..)
  2. 런타임 타임에도 동작하는 요소



### React 함수형 컴포넌트

```jsx
import React from "react";
import ReactDom from "react-dom";

// 함수형 컴포넌트를 생성
function App() : React.ReactElement {
    return <h1 id="title">hello React World!!!</h1>
}


// ReactDOM.render은 돔에 리액트 컴포넌트를 반영하는 함수이다.
// 첫번째는 컴포넌트, 두번째는 렌더링될 타겟 돔이다.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

```



#### babel 컴파일 변환

```javascript
import React from "react";

function App() {
  return /*#__PURE__*/React.createElement("h1", {
    id: "title"
  }, "hello React World!!!");
}


ReactDOM.render( 
    /*#__PURE__*/React.createElement(React.StrictMode, null,
    	/*#__PURE__*/React.createElement(App, null)
    ), document.getElementById("root")
);
```



#### App 컴포넌트 확장

```typescript
// interface를 이용해서 App컴포넌트의 props 타입을 정의한다.
// App 컴포넌트에서 받을 속성 객체의 타입을 함수 컴포넌트 매개변수에 명시 가능하다.
interface AppProps {
    title: string;
    color: string;
}

function App(props: AppProps) : React.ReactElement {
    return <h1 id="title">{props.title}</h1>
}
```





### 아키텍처

- 어떤 상황에서는 정답일수 있지만 또 다른 상황에서는 정답이 아닐 수 있다.



### 좋은 주니어가 되기 위한 것은?

- 시니어와 비교했을 때 압도적으로 유리한 것이 있는데 바로 시간이다!
- 이 강점을 이용해서 더 많은 정보를 습득하고 잘 활용하자.
- 초조한 생각은 이러한 것들을 방해하니 여유를 가지자!



### FLUX 아키텍처

- 페이스북에서 상태(전역상태)를 관리하는 아키텍처이다.
- 리덕스라는 라이브러리가 FLUX 아키텍처를 좀더 사용하기 쉽게 제공한다.



### Redux

- 리덕스는 매우 간단하다. 
- 너무 간단해서 어려워하는 것 같다.
- 하지만 단순하게 형태를 가지는 이유가 있다.



### MobX

- MobX는 Redux와 패러다임, 상태를 사라보는 관점, 형태가 다르다.
- MobX는 여러 기능을 제공하기 때문에 원래 의도와 다르게 더 넓은 범주에서 사용가능하다.



### 자바스크립트의 유연성

- 자바스크립트는 유연성을 가지고 있어서 실수할 여지가 늘 존재한다.
- 타입을 강제해서 컴파일 타임에 막을 수 있다면 더 좋다.
- 개발자가 실수할 수 있는 여지를 줄여주니 장단점, 실수할 여지가 있는지 잘 고려해야 한다.
