```jsx
import {createStore} from './redux';

function reducer(state = {}, action) {
	switch(action.type) {
        case 'inc':
            return {
                ...state,
                counter: state.counter + 1
            }
        default: return {... state};
    }    
}

const store = craeteStore(reducer);

// 변경했을 때마다 구독자에게 알려준다.
store.subscribe(() => cosnole.log(state.getState()));

// dispatch를 이용해서 전달해 준다.
store.dispatch({type: 'inc'});
```

reducer, dispatch, createStore 등 이 모든 것들이 동기적으로 작동한다. 이 reducer는 순수함수 이어야 한다. 외부와 아무런 의존성 없이, 내부적으로 side effect 없이 동작해야 하는 것이다.

> 동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때, 해당 HTTP 메서드가 **멱등성**을 가졌다고 말합니다. 다른 말로는, 멱등성 메서드에는 통계 기록 등을 제외하면 어떠한 부수 효과(side effect)도 존재해서는 안됩니다. 올바르게 구현한 경우 [`GET`](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/GET), [`HEAD`](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/HEAD), [`PUT`](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/PUT), [`DELETE`](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/DELETE) 메서드는 멱등성을 가지며, [`POST`](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST) 메서드는 그렇지 않습니다. 모든 [안전한](https://developer.mozilla.org/ko/docs/Glossary/safe) 메서드는 멱등성도 가집니다.
>
> https://developer.mozilla.org/ko/docs/Glossary/Idempotent

### 순수하지 않는 작업

실행할 때마다 결과가 일정하지 않는 작업들을 말한다. 대표적인 것이 비동기 작업 (API 호출)이 있다. 매번 호출할 때마다 결과 예측이 되지 않는다. redux에서는 어떻게 이것을 다룰 것인가? 

위의 구조만으로는 가능하지 않다. 

```jsx
function api(url, cb) {
    setTimeout(() => {
        cb({type: "응답", data: []});
    }, 2000);
}

function reducer(state = {counter: 0}, action){
    switch(action.type) {
        case 'fetch-user':
            api('/api.v1.users.1', users => {
                // 비동기로 되어 있다.
                // 클로져로 잡혀 있기는 하지만 이전의 타이밍을 놓친 상황이다.
                return {...state, ...users};
            });
            // 리덕스에게 리듀서가 반환할 상태가 없다.
            break;
    }
}

state.dispatch({
    type: 'fetch-user'
})
```

리듀서가 기본적으로 동기함수이기 때문에 비동기 호출에 대해서 처리가 불가능하다. 따라서 이것을 처리해야 하는데 이것을 처리하기 위해서 미들웨어를 사용한다.

미들웨어는 리덕스가 제공하는 기본동작은 동기적인 작업만 처리하고 사이드 이펙트가 존재하는 비동기 작업은 리듀서 밖에서, 즉 미들웨어에서 하도록 한다. 

​    

## 미들웨어

```js
// 미들웨어의 기본 형태
const myMiddleWare = store => dispatch => action => {
    dispatch(action);
}
```

미들웨어는 지연호출에 대한 개념을 알려주기 위해서 미들웨어에 대한 부분을 다루고 있다. 리덕스 공식문서에 잘 설명되어 있다. 

```javascript
function yourMiddleWare(store) {
    return function(dispatch) {
        return function(action) {
            dispatch(action);
        }
    }
}

function outMiddleWare(store, dispatch, action) {
    dispatch(action);
}
```

위의 3가지 미들웨어는 전부 dispatch(action)이라는 형태에서 동일하다.

다른 점은 인자 하나, 하나, 하나 받는 함수의 중첩과 인자 3개를 받는 것의 차이이다. 이런 것이 가능한 것은 클로져 때문이다. 이렇게 인자가 n개인 함수를 인자를 1개씩 받는 함수로 분리하는 기법을 커링이라고 한다. 

그런데 왜 쪼갤까?

```javascript
myMiddleWare(store)(store.dispatch)({type:"inc"});
youMiddleWare(store)(store.dispatch)({type:"inc"});
```

어떤 이점이 있을까요?

로그를 찍고 싶다. 액션이 들어왔을 때 어떤 액션이 들어왔는지를 확인하고자 한다. 프로덕션 레벨에서는 리 듀서에 넣기가 어렵다. 이럴 때 하는 방법은 dispatch 하기전에 일일히 넣는 것이다. 하지만 이럴 때에는 일일히 다 넣어야 하는 문제가 있다.

​    

### 리덕스 미들웨어 문서를 읽어보자

https://dobbit.github.io/redux/advanced/Middleware.html

코드를 감싸는 방법은 함수가 있다. 

일일히 호출하는 것 대신 재활용하기 위해 호출하는 코드들을 함수안에 묶어서 그 함수를 호출한다. 그다음 다시 필요없을 때 로그 함수를 지우는데 그 코드를 지우게 되면 다시 빌드를 하고 QA를 하고 하는 과정이 필요하다.그래서 코드를 수정하는 방식은 비싼 비용이다. 그래서 가능한 코드를 최대한 수정하지 않고 코드 행위를 변경할 수 있는 테크닉들을 연구하는 것이다.

몽키패칭이라는 기법이 나온다.

​    

### 몽키패칭이란?

https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/

몽키패칭은 실행중인 어떤 코드를 런타임상태에서 변경하는 테크닉이다.

```javascript
// 런타임에 어떤 것을 다른 것으로 변경한다.
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}
```

위와 같이 함수를 감싸는 것이 1개가 아니라 2개이상이 있을 때는 어떻게 할 것인가?

바꿔친 함수가 로깅하는 것인데, 이것 뿐만 아니라 다른 것들을 다 적용하려면 어떻게 해야 할까???

좋게 느껴지지 않는 이유는 하드코딩이기 때문이다. 변경할때마다 소스코드를 하나하나 고쳐야 하기 때문이다. 

소프트웨어에서 1개가 적용할 때, 2개 이상 되게 만들 때는 어려워 진다. 1개와 2개이상에는 큰 간극이 존재한다.



어떤 데이터가 있다. 그리고 그 데이터를 처리하는 처리기, 그리고 결과값

처리기는 고정되어 있다. (redux)

리덕스 입장에서는 모든 것을 다 할 수 없다. 그러니 자신은 변경하지 않으면서도 확장성이 있었으면 좋겠다. 

첫번째는 플러그인,

두번째는 미들웨어 

라는 2가지 어프로치를 할 수 있다.

여기에 흘러가는 데이터들이 처리기를 거쳐한다. 

인풋, 아웃풋이 계속되는 흐름이 있다.

데이터 흐름 안에 중간에 거쳐나가게 하는 것을 미들웨어라고 한다.

미들웨어는 데이터 흐름이 미들웨어를 전부 거치게 되어 있다.

반면에 경우에 따라 적용되고 안되는 것을 플러그인이라고 한다.

미들웨어의 특징는 데이터 흐름상에 중간에 존재하는 프로그램이다.

물론 미들웨어가 세팅할 수 있는 것은 리덕스에서 제공해줘야 한다.

미들웨어는 **위치한 순서대로** 데이터 처리가 적용된다.  따라서 순서에 의존성이 존재하는 미들웨어는 적용할 때 조심해야 한다.

미들웨어의 소프트웨어 공학적인 관점

미들웨어가 필요하지 않는 이유는 비동기적인 것을 처리하기 위해서이다. 리듀서는 동기적인 흐름으로 동작하기 때문에 리듀서의 바깥쪽에서 처리해야 하는 것이다. 액션이 들어 왔을 때 그 액션이 순차적으로 흘러갈 수 있도록 하는 구조를 미들웨어라고 한다. 



```javascript
// 런타임에 어떤 것을 다른 것으로 변경한다.
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

// 바까쪽에서는 store.dispatch를 호출하고
// 그 안에 들어와서 원본이었던 next를 실행한다.
// 바깥함수, 안쪽함수 이렇게 구조적으로 분리되었다.
```



```javascript
// 제작자
const add1 = function(a, b) {
    return a + b;
}

const add2 = function(a) {
    return function(b) {
        return a + b;
    }
}

// 사용자
add1(10, 20);	// 중간에 개입할 수가 없다.
add2(10)(20);	// 중간에 개입할 수 있다.


// 몽키패칭을 할 수 있는 구조인 것이다.
const addTen = add2(10);
// do something
addTen(20);
```

커링은 인자와 인자 사이에 사용자가 개입할 수 있도록 해준다.

자신이 무언가 해야되는게 필요할 떄 그것을 하고 나서 원래의 함수를 호출한다.

// 29분



커링을 이용해서 미들웨어를 만들면 리덕스가 그것을 가져다가 리덕스가 원하는대로 사용할 수 있다. 

```javascript
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}
```

이렇게 3개의 중첩된 함수를 사용하는건 등록된 미들웨어를 순서대로 연결시키는 구조를 만들수 있게 리덕스가 그것을 만드 ㄹ수 있게 한 구조를 위해서 커링을 활용한 것이다.

최종적으로 로직은 제일 안쪽에서 쓴다.



기존의 createStore는 reducer만 인자를 받는데, 이번의 createStore은 middleware를 받는다. 이들 미들웨어는 3가지 함수가 중첩된 커링된 함수이다. 

```javascript
middlewares = Array.from(middlewares).reverse();
// 원래 디스패치를 변수에 넣는다.
let lastDispatch = store.dispatch;

// 미들웨어를 순회하면서 가장 마지막 미들웨어부터 나온다. (위에서 역순 정렬 했으므로)
// 
middlewares.forEach(moddleware => {
    lastDispatch = middleware(store)(lastDispateh);
});

// 예를 들어 미들웨어가 [m1, m2, m3, m4] 가 있다면 이것을 역순으로 해서 적용을 하니
// m1(m2(m3(m4(store.dispatch)))) 이러한 형태가 되는 것이다.
```



이렇게 미들웨어를 넣어주면 모든 디스패치를 할때마다 미들웨어도 같이 동작한다. 

사가라면, 액션이 디스패치되었는데, 그것이 비동기, API 호출이라면, 사가가 이 액션을 들여다보고 next를 안하고 ajax 호출을 하는 것이다. 그 다음 비동기 응답이 오면 next를 하는 것이다. 



UI족에서는 특정 디스패칭을 했는데 그것을 미들웨어가 중간에 그것을 가로채서 다른 디스패칭으로 리듀서에 보낼 수 있다. 미들웨어는 비동기, 로거등이 것들을 처리할 수 있다.

store를 왜 준 것이냐면 또 다른 상태를 변경하는 경우가 생길수 있기 때문에 그렇다.

제품 상세를 보는 액션이 흘러왔는데 미들웨어가 액션에 대한 조건(로그인 등등)을 확인하고 중간에 그런 조건들에 대한 액션을 실행하면 그 비즈니스 흐름에 따라서 진행이 되는 것이다.



리덕스 붙이는 방법

contextAPI를 이용해서 주입하는 방법.

훅을 이용해서 연결하는 방식



리듀서의 미들웨어 사용하는 것 대신 다른 것을 만들어도 된다. 하지만 그렇게 되면 일관성이 사라진다. 프론트가 어떨때는 디스패치하고, 어떨때는 외부 API를 호출하는 외부 함수를 호출하고 이러한 것이 일관성이 없어진다. 이렇게 경우의 수에 따라서 일관성이 사라지면 해당 히스토리, 로직등을 모르는 개발자가 보면 파악하기가 어려워 진다. 

