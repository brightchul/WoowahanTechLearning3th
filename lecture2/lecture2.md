# 우아한 테크 러닝 3기 2일차



### 프로그래밍의 특징

프로그래밍은 서양에서 만들어졌기 때문에 사람의 철학, 문화, 사상들이 녹아있다. 합리 주의, 논리 등을 기반으로 해서 만들어졌기 때문에 프로그래밍 언어도 그렇게 구성되어 있다. 프로그래밍의 기저에 있는 공리를 이해하고 나면 그 원칙으로 인해 한꺼풀씩 벗겨나가면서 파악해 나갈 수 있는 장점이 있다.



## 자바스크립트의 함수

- 자바스크립트의 거의 모든 것들은 값이다.
- 자바스크립트의 함수는 일급객체로서 값이 될 수 있다.
- 자바스크립트의 함수는 반드시 값을 반환하도록 되어 있다. 
- 명시적으로는 return을 이용해서, 암묵적으로는 undefined를 반환한다.



```javascript
const bar = function bar() {}

// 함수 호출하는 부분에서는 변수 bar를 본다. 함수이름 bar를 보지 않는다.
bar();
```



### 함수의 인자, 변수

- 함수와 인자 안에서 값이 위치할 수 있고, 리턴할 때에도 값이 위치할 수 있다.



### 즉시 실행 함수

- 단독으로 익명 함수를 사용하면 에러가 발생한다.
- 익명함수를 값으로 하기 위해서는 괄호를 사용한다.

```javascript
(function() {
    
})();
```



### 콜백 함수

```javascript
function foo(fn) {
    fn();
    return function() {};
}

const y = foo(function() {});
```

- 어떤 함수에게 함수 호출을 위임한다.
- 함수 합성, 하이오더함수, HOC
- 함수를 인자로 받는 함수, 함수를 리턴하는 함수
- 값으로 취급하는 함수는 변수에 입력할 수 있다.
- 자바스크립트에서의 함수는 코드를 묶고 있는 값으로 이해하면 좋다.



- 이름을 생략하지 않으면 재귀호출이 가능하다.

```javascript
function foo(num = 0) {
    if(num === 100) return;
    
    console.log(num);
    foo(num+1);
}
```



### 화살표 함수

- 2개 이상일 때는 인자에 괄호, `=>` 이후가 1줄일 때는 키워드 return 생략가능 

```javascript
const bar = () => {
    
}
```



- 자바스크립트에서 함수를 값을 리턴한다.



## 식 (expression), 문 (statement)

- 자바스크립트 함수는 식, 문으로 이루어질 수 있다.
- 코드의 실행 결과가 값으로 나오면 식이다.
- 값이 안 나오는 것은 문이라고 한다.
- 함수는 입력값을 받고 그 결과를 돌려준다.

```javascript
const bar = x => x * 2;
```



- 값 자체는 계산할 수 없다. 즉 immutable 하다.
- 문은 계산을 할 수 있다.



### new 연산자

- 빈 객체를 만들어서 함수에 전달한다.
- new일때에는 this 객체가 생성된다. 
- 객체일 때에는 동적 바인딩이 일어난다.
- new 함수는 내부적으로 this를 만들어 주고
- 새로만든 this가 리턴이 된다.
- 함수가 구조적으로 그런 객체를 만드는 것을 생성자함수라고 한다.



### 인스턴스 객체

- instanceof라는 연산자로 인스턴스 함수의 생성자 함수를 확인해서 객체를 누가 만들었는지 알 수 있다.
- 프리미티브 타입, 객체, 객체라면 객체 구조가 복잡할 수 있다.
- 객체를 만들 수 있는 인증된 함수를 만들고 해당 생성자 함수인지 확인되면 객체라고 인정한다. 일종의 계약을 하는 것이다

```javascript
class Foo {}
const y = new Foo();

if (y instanceof Foo) {
    
}
```



```javascript
const person = {
    name: "홍길동",
    getName() {
        return this.name;
    }
}

console.log(person.getName());

// 함수가 실행되는 순간 실행의 소유자를 파악한다.
const man = person.getName;
console.log(man());

// 키워드 : 실행컨텍스트
```



### 이벤트와 콜백 함수

- 이벤트 시스템은 UI만들 때 필요하다.
- 사용자 이벤트를 받아야 하는데 언제 할지 모르니 기다려야 하고 이러한 상황을 코드 수준에서 실행을 적시할 수 없다고 한다.
- 브라우저가 제공하는 이벤트 시스템에게 실행할 함수를 줄테니 실행해달라고 요청하는 데 이것이 전형적인 콜백이다.

- 리액트 클래스 컴포넌트에서는 arrow function으로 해서 bind대신 this 바인딩을 하기도 한다.

```javascript
button.addEventListener("click", person.getName.bind(person));
```



### 클로져

- 값을 보호할 때 많이 쓴다.

```javascript
function makePerson() {
    let age = 10;
    return {
        getAge() {
            return age;
        },
        setAge(x) {
            age = x;
        }
    }
}
```



```javascript
function foo(x) {
    console.log("앗싸");
}

setTimeout(function(x) {
    console.log("aaa");
    setTimeout(function(y) {
        console.log("bbb");
    }, 2000);
}, 5000);

const p1 = new Promise((res, rej) => {
    setTImeout(() => {
        res("응답");
    }, 1000);
});

p1
.then(r => console.log(r))
.catch(() => {});	// thenable, promise 객체
```



### Promise

- then 안의 콜백 함수는 Promise가 생성되면서 resolve, reject의 2가지 함수가 있다.

- resolve를 호출하려면 then의 콜백함수를 실행시켜준다.

- reject의 경우 catch안의 콜백 함수를 실행시켜준다.

- 여기서 resolve를 클로져로서 setTimeout 안의 resolve를 참조로 해서 사용하는 것이다.

```javascript
cosnt p2 = new Promise(res, ref) => {
    setTimeout(() => {
        resolve("응답");
    }, 1000);
};

p1
.then(p2)
.then(console.log)
.catch(function(){});

```



### Async 함수

- async는 비동기 함수를 동기화처럼 처리할 수 있다.
- async를 붙이면 내부에 await를 쓸 수 있다. 

- 실제로는 비동기로 돌아가지만 동기적으로 돌아가는 거 처럼 보이는 것이다.
- 만약 resolve가 호출되지 않으면 pending 상태로 되어서 영원히 2가 찍히지 않는다.
- 비동기를 다루기 위해서는 promise를 하고, 그것을 다시 동기적으로 async를 쓴다.

```javascript
const delay = ms => new Promise(res => setTimeout(res, ms * 1000));

async function main() {
    console.log(1);
    try {
        await delay(2);
    } catch(error) {
        // 만약 reject가 일어나면 여기서 받는다.
    }
    console.log(2);
}
```





### 커링

- 커링은 인자를 나누는 것이다.

```javascript
const foo = a => b => c => a+b+c;
```



### 웹앱과 스토어

- 웹앱은 수많은 ui 요소들로 중첩되어 있고 리액트라면 그 하나하나가 컴포넌트가 될 것이다.
- 여기서 상태가 쓰여지는데 이 상태를 스토어라고 하고, 이것을 모든 컴포넌트에 다 줘서 필요한 만큼만 뽑아서 쓰게 한다.
- 하지만 스토어 내 상태가 많으면 그것을 다시 그려야 하는 경우가 생기고 계속해서 화면이 리렌더링 될 것이다.
- 리액트의 경우 Virtual DOM이라는 개념을 가지고 와서 변경된 것들에 대해서만 반영을 하는 것이다.