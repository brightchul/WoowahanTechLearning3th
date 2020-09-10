## 리액트

1. 리액트에 대한 기본 내용
2. 리액트 구현에 대한 내용들

- 개발자라면 기능을 이용하는 것으로만 머물지 않았으면 좋겠다. 사용법만 많이 알면 깊이 보다는 넓이만 추구하게 되어서 한도 끝도 없이 계속 배워야 해서 현타가 올 수가 있다.

- 이 사람들은 무슨 생각으로 만들었을까? 이것을 알면 어떤 것을 만들 때 적정기술인지 아닌지 파악할 수 있다. 왜 그렇게 하는가? 왜 그렇게 만드는가? 이것을 아는게 중요하다.

```javascript
// 상태와 template literals를 이용한 방식

const list = [
  { title: "React에 대해 알아 봅시다" },
  { title: "Redux에 대해 알아 봅시다" },
  { title: "TypeScript에 대해 알아 봅시다" },
];

const rootElement = document.querySelector("#root");
function app() {
  rootElement.innerHTML = `
    <ul>
        ${list.map({title} => (`<li>${one.title}</li>`)).join("")}
    </ul>
    `;
}

app();
```

​    

### 변화에 대응하는 코드

- 코드는 끊임없이 변화하다 보니 좀더 변화에 잘 대응할수 있는, 빠르게 수정할 수 있는 코드가 필요하다.
- 코드에서 같은 것끼리 묶고, 다른 것은 분리하자. 이 원칙을 어떻게 지키고 어떠한 것이 같고 다른 것인가? 같은 것과 다른 것의 분리가 역량에 따라서 차이가 많이 난다.
- 어떠한 복잡도의 데이터를 다루느냐에 따라서도 달라진다.

​    

### 기본의 중요성

- 아키텍처에서 제일 첫번째 할수 있는 것은 "이름을 잘 짓기"이다. 

- 네이밍만 잘 주면 여러가지의 좋은 영향을 주는 요소가 있다면 그 중 아주 기본적인 10가지 정도가 좋은 코드구조를 만드는데 70~80퍼센트의 영향을 준다. 
- 그 외 나머지 방법들은 20퍼센트의 디테일을 잡는 방법이라고 보면 된다.

- 너무 높은 수준을 추구하다가 기본을 소홀히 하지 않도록 한다. 항상 70퍼센트의 기본부터 충실하게 하는게 중요하다.

```javascript
// 네이밍 수정
// 의존성이 외부 변수에 영향을 받고 있다.
// 순수함수로 변경 (동일 input => 동일 output, no side effect)

function app(items) {
    rootElement.innerHTML = `
        <ul>
            ${items.map({title} => (`<li>${one.title}</li>`)).join("")}
        </ul>
    `;
}

app(list);
```

​    

### VDOM의 배경

- real DOM을 가지고 html UI를 직접 컨트롤 하는 것은 안정성이 떨어진다. low한 레벨이기 때문이다. 그래서 이것으로 UI를 다루다 보면 복잡도가 증가하고 수정이 어려워 진다.
- 따라서 복잡도가 덜증가하기 위해서 감싸서 처리를 하다보면 좀더 처리하기가 쉬워질 것이다.

- 브라우저가 있다. 브라우저는 태그, 문자열을 화면에 그려준다. 문자열은 특정한 구조가 없고 데이터 자체라서 다루기 어렵다. 이것을 다루기 쉬운 구조인 DOM으로 변환하고 이것으로 문자열을 다룬다. 이렇게 DOM Tree로 좀더 다루기 쉬운 구조로 변환해서 다루게 된다.
- 이와 같은 방식을 리액트에서 시도한 것이다. real DOM을 자바스크립트로 직접 다루는 것은 힘드니까 우리는 그 사이에 VDOM을 만들어서 이것으로 다루는 것이다. 리액트 팀은 쉽게 마크업 하듯이 코딩할 수 있도록 JSX를 만들어 냈다.

```jsx
// 리액트 + JSX를 활용한 방식

import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div>
      <h1>1</h1>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>TypeScript</li>
        <li>mobx</li>
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

​    

[[여기]](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wG4AoUSWRYmAEVzmycLoFoATXM88zAK4A7DMAhC4AQTBgAFAEo4Ab3Jw4RGAKgTZqtXAA8nYADcAfHv2GAFgEYztgwHo7Fq2oMCANm_cevwGbI6DDOAb5-BuHInAIAHmGBlu5RgQAqAJ5gSADKaFDAYKFO4clWqWYgEABGCSVJkU7eEYZOxuZ68hQAvuTBGPQA8gCyAHREQpxIULoe_TCjOTAFGMMQUy0G0mBwTr7O84vLwKvrSGYANHrcaAIgSEILAOZIMACiXkj3jwBCGQCSnFkhAgEBg-Hk5C6fCAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react%2Ctypescript&prettier=false&targets=&version=7.11.6&externalPlugins=) 를 보게 되면 babel이 jsx문법을 자바스크립트 코드로 변환하는 것을 볼 수 있다. 변환된 코드에서 보면 React.createElement가 있다. 이것은 virtual DOM을 만들어 준다.

자바스크립트에서는 React.createElement으로 VDOM을 만들어 주고, React는 VDOM을 realDOM으로 변환한다. 여기서 편의를 위해서 JSX를 만들어서 컴포넌트를 만들수 있도록 했다. 리액트 컴포넌트를 반환하는 함수는 다른 쪽에서 그대로 리액트 컴포넌트로 사용할 수 있다.

​    

```jsx
// List 컴포넌트로 분리함.

import React from "react";
import ReactDOM from "react-dom";

function List() {
  return (
    <ul>
      <li>React</li>
      <li>Redux</li>
      <li>TypeScript</li>
      <li>mobx</li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>1</h1>
      <List />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

​    

### 이름을 주는 구조

- 중요한 것은 이름을 줄 수 있는 구조가 좋은 것이다.
- 더이상 마크업만 보고 데이터가 어디에 어떻게 들어가 있는지 파악해야 하는것이 아니라 컴포넌트 이름만 보고도 좀더 파악하거나 수정하기가 쉬워진다.
- html 문자열을 어떻게 하면 자바스크립트로 컨트롤 하기 쉬운 객체 구조로 바꿀 수 있을 까? 아래처럼 만들 수 있을 것이다.

```javascript
// 맨 상위에 최상위 부모 컴포넌트가 있다.
// 따라서 vdom은 기본적으로 하나만 있는 구조이다.

const vdom = {
  type: "ul",
  props: {},
  children: [
    { type: "li", props: { className: "item" }, children: "React" },
    { type: "li", props: { className: "item" }, children: "Redux" },
    { type: "li", props: { className: "item" }, children: "TypeScript" },
  ],
};
```

함수 컴포넌트에서 인자, 전역으로 데이터를 넘겨줄 수 있을 것이다. 하지만 전역을 사용하는 것은 최대한 지양해야 한다. 그러니 인자로 데이터를 넘겨줄 것이다.

babel을 통해서 JSX가 createElement 구문으로 변경된다.
React.createElement는 내부적으로 vdom을 만드는 메서드이다.

화면에 붙이는 시점은 render를 호출할 때이다.
render는 vdom을 따라가면서 real DOM으로 변환하는 메서드이다.
최종적으로는 root Element에 결과물을 붙여줄 것이다.

​    

### 이제 VDOM을 만들어 보자.

위에서 만들어진 vdom데이터를 참고해서 createElement를 만들어보자.

```jsx
function createElement(type, props = {}, ...children) {
  return { type, props, children };
}
```



바벨 최상단에 아래와 같이 주석을 주면 해당 이름으로 createElement를 반영해준다.

```
/* @jsx myCreateElement */
```

​    

### 컴파일 타임, 런타임 타임

- 어떤 것이 컴파일 타임인지, 런타임 타임인지 파악해야 한다.

- 원래 자바스크립트는 컴파일 타임이 없는 언어였다. 

- 트랜스파일링이 도입되는 현재 자바스크립트 개발방식에서는 컴파일 타임이 생겨나게 되었다.

​    

### 성장가능성

- 면접관마다 성장가능성을 판단하는 부분이 다르다.
- 1차적으로는 성장가능성보다, 먼저 기술 학습이 어느정도 된다음에 생각하는 부분이다.
- 기술에 대한 진지한 학습을 증명해 내지 않는 다면 성장가능성은 고려되지 않는다.
- 일, 개발, 코딩에 대해서 열정적인 느낌을 내는가? 그외에 여러가지 느낌들을 본다.
- 신입에겐 기술 학습이 기본이다.

​    

### 코드 분석

- 깃허브에서 초기 릴리즈부터 확인해 본다.
- 기본적인 큰 틀은 크게 다르지 않기 때문에 기본 컨셉에 충실하고 크기가 적은 초기 릴리즈를 보는 게 좋다.

​    

### 리액트에 대한 기본기

```jsx
import React from 'react';
import ReactDOM from 'render-dom';

// 클래스 컴포넌트 
class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <p>안녕하세요</p>;
    }
}
// 함수 컴포넌트에서는 JSX를 반환해서 VDOM을 반환한다.
function App() {
    return <h1>상태</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

앱이라는 컴포넌트가 함수이다. 이것을 호출하면 스코프 생성, 지역 변수등이 생성된다. 매번 호출될 때마다 초기화가 된다. 리액트 초기에는 함수형 컴포넌트는 기본적으로 상태를 가질수 없었다. 리액트 클래스 컴포넌트는 상태를 자연스럽게 가질 수 있다. 

초기 리액트에서는 상태를 가질 경우 클래스 컴포넌트를, 상태를 그리기만 한다면 함수 컴포넌트로 하는 것으로 했었다. 이 컴포넌트들은 기본적으로 라이프사이클이 존재했다. 함수 컴포넌트는 라이프 사이클이 없다. 

클래스 컴포넌트는 매번 호출할 때마다 생성할 필요가 없기 때문에 라이프사이클 메소드를 가지고 있다가 해당 라이크사이클 메소드가 호출된다.

리액트는 적절한 타이밍에 적절한 메소드들을 호출하고 이것을 라이프사이클 메소드라고 한다. 돔에 생성되었을 때, 상태나 요소가 변경되어서 다시 렌더링 해야할 때, 돔이 제거 될 떄 등이 있다.

```jsx
componentDidMount() {
    // 이렇게 하면 리액트가 상태 변경을 알지 못한다.
    this.state.count = 100;	
    
    // 이렇게 해야 리액트가 알 수 있다.
    this.setState({count: this.state.count + 1});	
    
    // 물론 Proxy 등을 이용하면 변수에 직접적으로 넣더라도 가능하게 만들 수도 있다.
}
```

​    

##  React Hook

### useState

```jsx
function App() {
    // [값, 상태변경함수] 배열을 반환한다.
    const [counter, setCounter] = useState(1);
    
    // 클릭이 일어났을 때 상태 변경이 일어나고 다시 렌더링이 일어난다.
    return (
    	<div>
        	<h1 onClick={()=>setCounter(counter+1)}>상태</h1>
            <p>{result}</p>
        </div>
    )
}
```

​    

#### 상태변경을 어떻게 알까?

`setCounter`가 호출하면 상태가 변경했다고 인식하고 다시 리렌더링 할 것이다. 마치 클래스 컴포넌트의 `setState`와 유사할 것이다.

​    

#### 함수 컴포넌트의 상태값이 유지되는 방법은 무엇일까?

- 함수 컴포넌트가 호출될 때 훅이 연이어 호출되면 리액트는 그것을 알고 이 컴포넌트와 연관된 훅이라는 것을 알고 전역 배열에 넣는다. 그리고 그 배열에 해당 값을 넣은 인덱스를 반환되는 상태 변경 함수에 넣는다. 

- App을 다시 호출할 떄 그 배열 안에 값이 들어가 있으므로 인자로 들어오는 훅 호출의 초기값을 무시하고 값과 상태 변경 함수를 반환한다.

- 훅은 전역배열을 가지고 있고 컴포넌트를 키로 해서 컴포넌트가 생성된 순서대로 인덱스를 해서 배열에 훅들을 넣어놓고 찾을때도 그렇게 찾는다. 이런 배경 때문에 Hook에 대한 규칙이 존재한다. [[Hook의 규칙]](https://ko.reactjs.org/docs/hooks-rules.html)
- 리액트 함수 컴포넌트를 인덱스로 잡으니까 일반 함수에서는 될 수가 없다 또한 이러한 로직 때문에 함수 컴포넌트의 라이프 사이클을 체크할 수 있다.

​    

### 잘 파악하는 방법

이것을 이해하기 위해서는 리액트가 VDOM을 어떻게 만드는지, 바벨이 어떻게 컴파일하고 메소드 호출하는지, 그 메소드 안에서 어떻게 동작이 일어나는지 등을 이해하고 간단하게 컨셉을 반영해서 구현해보는게 좋다.

- 바벨의 트랜스컴파일의 컨셉을 [[간단하게 구현]](./example)

- 훅도 간단히 구현해보자 [[간단하게 구현]](./example2)

​    

### 최적화 관련된 부분 (질답)

- 성능 문제는 코드만 봐서는 최적화 할 수 없다. 
- 크롬의 프로파일러, 퍼포먼스 등을 체크 하면서 같이 최적화를 진행하는게 좋다.

​    

> 다음시간에 호출의 지연 로직를 다룰 것이다.
> 미들웨어를 하기 위해서는 지연에 대해서 잘 알아야 하고
> mobX, Observable를 할때 지연로직을 많이 활용한다.

