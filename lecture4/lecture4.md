```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

const rootElement = document.querySelector("#root");

// 데이터가 컴포넌트 바깥영역에 있다.
const sessionList = [
    { title: "1회차 Overview" },
    { title: "2회차 React만들기" },
    { title: "3회차 Redux만들기" },
    { title: "4회차 컴포넌트디자인및비동기" },
];

ReactDOM.render(
    <React.StrictMode>
        <App store={sessionList} />
    </React.StrictMode>,
    rootElement
);
```

```jsx
// App.jsx
const SessionItem = ({ title }) => <li>{title}</li>;

const App = ({ store: { sessionList } }) => (
    <div>
        <header>
            <h1>React and TypeScript</h1>
        </header>
        <ul>
            {/*코드로서 만들어지는 것은 다시 읽어야 하니까 가독성이 안좋다.*/}
            {sessionList.map(({ title }) => (
                <li>{title}</li>
            ))}
        </ul>
    </div>
);
```

아키텍처는 실제로는 작은 코드에서 부터 시작한다.
몇가지 원칙들이 있다.

1. 이름만 잘 정해도 된다.
2. 크기를 쪼개라. (쪼개는 기준, 시점은 언제인건가?)
3. 약간 분리되면 좋겠는데? 라는 생각이 들때가 적절한 타이밍이다.

```jsx
// App.jsx
const SessionItem = ({ title }) => <li>{title}</li>;

const App = ({ store: { sessionList } }) => {
    const {displayOrder, toggleDisplayOrder} = React.useState('ASC');

    const orderedSessionList = sessionList
        .map((session, i) => ({...session, order: i}))
        .sort((a,b)=>>a.order - b.order);

    const onToggleDisplayOrder = () => {
        toggleDisplayOrder(displayOrder === 'ASC' ? 'DESC' : 'ASC');
    }

    return (
    <div>
        <header>
            <h1>React and TypeScript</h1>
        </header>
        <p>전체 세션 갯수 : {sessionList.length}개</p>
        <button onClick={toggleDisplayOrder}>재정렬</button>
        <ul>
            {sessionList.map({title} => <SessionItem title />)}
        </ul>
    </div>
    );
};
```

함수컴포넌트는 원래는 내부에서 만들어봐야 다시 변경한 뒤에 렌더링 되지 않는다.
그래서 클래스 컴포넌트를 만들고 내부 상태 및 상태 변경 함수를 만들어서 했다.

리액트 훅을 만들어서 함수 컴포넌트 안에서도 상태를 가지게 되었다.
훅을 사용해서 상태가 변경하고 다시 해당 함수컴포넌트를 호출해서 렌더링을 해주는 것이다.

클래스 컴포넌트는 상태, 상태 변경, 컴포넌트 코드 들이 전부 메소드, 생성자 등에 퍼져 있는데 함수 컴포넌트는 함수 안에 모든게 다 들어 있으니 가독성, 단순함, 응집성이 좋다.

### 3년차

3년차 개발자 : 기본은 넘어섰으니 경험, 다양성, 비즈니스 도메인 등에 대한 업력을 쌓는 시기라고 생각한다. 4년차가 되면 실무적으로 가볍게 리딩할 수 있다고 생각한다. 그래서 이 시기 되면 개발 역량만 보지 않는다.

### 존중받는 코드

비즈니스 코드들은 다 존중받을 가치가 있다.

---

훅이 만들어지면서 함수 컴포넌트도 이제 상태를 가질 수 있게 되었다.

훅을 사용할 때 클로저가 걸린다.

### useEffect

```jsx
useEffect(() => {
    구독();
    return () => {
        구독해제();
    };
});
```

함수를 받는 훅이다. 이 훅은 함수 컴포넌트 안에서 함수컴포넌트가 실행될 때마다 렌더링 끝나고 나서 자기 안의 함수를 호출해 주는 훅이다.

사이즈 이펙트를 일으키는 함수를 넣는 훅이다. useEffect를 이용하면, 리턴을 함수로 해주면 해당 컴포넌트가 사라질 때 해당 반환된 함수를 실행해 준다. 하지만 이런 함수는 변수, 스코프 공간등을 지우지 않는다. GC는 JS 엔진이 알아서 해준다.

JS는 명시적으로 메모리 관리 메소드를 제공해 주지 않는다. 그러니 신경쓰지 말아라.

## 제네레이터

```js
// 제네레이터 함수
function* generatorFunction() {}

// async 함수
async function asyncFunction() {}
```

```js
// 지연을 설명하기 위한 비유이다.
const x = () => 10;
const y = x() * 10;
```

x값이 확정되는 것을 지연한다.
y의 값이 실행 될때 x값이 확정된다.

함수를 반환할 수 있다는 특징을 가지고 지연을 흉내낼 수 있다.
rxjs, MobX등이 이러한 지연테크닉을 활용한 것이다.

```js
const p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("1");  // 호출되면 then에서 받는다.
    }, 1000)
});

p.then(lfunction(r) {
    console.log(r);
})
;


function* make() {
    let num = 1;
    while(num < 100) {
        yield num++;
    }
}

cosnt i = make();
console.log(i); // 이렇게 하면 제네레이터 객체가 출력된다.

```

## 제네레이터

제네레이터는 실제로는 코루틴의 구현체이다.
코루틴이라느 것은
함수는 입력값을 받고 계산을 한 다음 결과값을 반환한다. 이것을 함수라고 한다. 만약 리턴이 없는 것은 프로시저라고 한다.

함수인데, 함수를 리턴을 여러번 할 수 있으면 어떠할까? 함수가 다시 호출할 때 함수가 리턴했던 시점에서 다시 시작하는 것이다. 이것을 코루틴이라고 한다. 이러한 개념중 일부를 참조해서 제네레이터로 구현해 놓았다.

```js
function* make() {
    let num = 1;
    while (num < 100) {
        yield num++;
    }
}

// 일반함수에서는 실행하면 바로 함수가 종료될 것이다.
// 하지만 제네레이터 함수는 객체를 전달한다.
// 그 객체 안에 next라는 메소드를 전달해 준다.
// next를 호출하면 그때 함수가 호출된다.
// 호출시  yield된 값이 반환된다.
const i = make();

// 다음에 yield된 값이 있는지 아닌지 확인할 수 없으니
// done이라는 값도 같이 준다.
console.log(i.next()); // {value: 1, done:false}

// 무한 루프지만 괜찮다. next 하기 전까지는 실행이 멈춰있기 때문이다.
// return 은 함수를 끝내는 것이고 yield는 끝내지 않는다.
```

기존 함수와 달리 제네레이터는 바깥 실행 영역과 서로 커뮤니케이션을 할 수 있다.
이것을 이용해서 많은 것을 할 수 있다.

```js
const delay = (ms) => new Promise((res) => setTImeout(res, ms));

function* main() {
    console.log("start");
    const result = yield delay(3000);
    cosnole.log("3 second");
}

// delay(3000).then(() => console.log("3초 뒤"));

const it = main();
const { value } = it.next(); // 이 때 promise객체가 온다.
if (value instanceof Promise) {
    value.then(() => it.next());
}
```

제네레이터 함수 내부를 보면 마치 동기 코드처럼 보인다.
바깥 영역에서 함수 내부를 제어하고, 함수 안쪽에서는 비동기적 상황도 동기적으로 적용할 수 있다.

이러한 컨셉을 이용해서 콜백을 사용하지 않고 동기적인 것 처럼 코드를 작성할 수 잇도록 한 것이 리덕스 사가이다.

```js
// async 에서는 이렇게 하면 된다.
async function main2() {
    console.log("start");
    await delay(3000);
    console.log("3초 뒤");
}
```

async함수는 promise에 최적화 되어 있는 함수이다. 반면 제네레이터는 그 외의 다양한 케이스에 대해서도 활용이 가능하다. 참고로 async함수 또한 내부적으로는 제네레이터로 되어 있다.

제네레이터는 여러가지를 활용할 수 있는데 그중 하나가 비동기적 코드를 동기적으로 다룰 수 있다는 것이다.

제네레이터는 코루틴을 구현한 구현체이다. 그 응용중 하나가 비동기에 대한 활용이다.

```js
const log = console.log;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const delay2 = (ms) => ms;

function* main3(func, funcName) {
    log(`${funcName}() : start`);
    yield func();
    log(`${funcName}() : end`);
}

function show(it, value) {
    if (value instanceof Promise) {
        log(`promise`);
        value.then(() => it.next());
    } else {
        log("not promise");
        setTimeout(() => it.next(), value);
    }
}

const i2 = main3(() => delay2(1000), "delay2");
const i1 = main3(() => delay(1000), "delay1");

let value2 = i2.next();
let value1 = i1.next();

show(i1, value1.value);
show(i2, value2.value);
```

> 다음번에는 lazy 호출
