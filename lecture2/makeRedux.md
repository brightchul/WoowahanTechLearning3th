# 리덕스를 만들어 보자.



### 1 . createStore

먼저 전역으로 활용할수 있는 저장소를 만들어 본다.

```javascript
// index.js
import {createStore} from "./redux.js";

const store = createStore();
```
```javascript
// redux.js 
export const createStore = () => {
    return Object.create(null);
}
```

​    

​    

### 2 . creteStore를 클로져로 변경

상태를 저장하고 해당 상태를 변경하게 하기 위해서 클로져를 사용한다.

```javascript
// redux.js
export const createStore = () => {
    const state = Object.create(null);
    return state;
}
```

​    

​    

### 3 . getter로 연결

직접 객체에 접근하는 것은 해당 저장 객체를 변경시키고, 오염 시킬수 있다. 그렇게 오염된 객체는 해당 객체에 의존성이 있는 모든 코드에 영향을 미친다. 따라서 getter를 만들고 immutable하게 객체 복사를 활용해서 오염의 가능성을 줄여보자.

```javascript
// redux.js
export const createStore = () => {
	const state = Object.create(null);
    const getState = () => ({...state});
    return {getState};
}
```

​    

​    

### 4 . 상태를 변경

원하는 의도에 따라 상태를 변경하고 싶다. 하지만 직접적으로 객체에 접근해서 변경하는 것은 오염의 여지가 크다. 따라서 변경 메서드로만 해보자. 상태는 임의로 `count : 0` 으로 해보기로 했다. 

상태객체는 Object.freeze를 이용해서 변경이 불가능하게 만들었고 immutable하게 만들도록 강제했다.

```javascript
// redux.js
const makeFreezedObj = (originObj = Object.create(null), newObj) => {
    return Object.freeze({...originObj, ...newObj});
};

export const createStore = () => {
    let state = makeFreezedObj(undefined, {count: 1});
    const getState = () => ({...state});
    const increment = () => {state = makeFreezedObj(state, {count : state.count+1})};
    
    return {getState, increment};
}
```

​    

​    

### 5 . 변경사항이 발생 : reset 기능을 추가한다.

사용하다 보니 변경사항이 생겼다. reset을 추가해 달라고 한다. 다시 redux.js의 코드를 수정해야 할까? 하지만  redux.js의 수정을 하는 것은 파일을 지속적으로 수정하는게 된다. redux.js를 여러 곳에서 사용하게 되면 변경의 여파가 redux.js를 사용하는 모든 곳에 미치게 된다. 

좀더 안전하게 사용하기 위해 추상화 시켜서 변경 로직을 사용자 측에게 받는 쪽으로 변경해 보자. 이렇게 하기 위해서는 createStore에서 비즈니스 로직을 받아야 한다. 이것의 이름을 reducer라고 하자. 하는 김에 내부의 객체 초기화도 같이 해주자.

```javascript
// index.js
import {createStore, makeFreezedObj} from "./redux.js";

// 비즈니스 로직을 외부에서 주입한다.
// state 객체 초기화를 여기서 해준다.
const reducer = (state = makeFreezedObj(), action) => {
	switch(action) {
        case "increment": return makeFreezedObj(state, {count: (state.count ?? 1)+1 });
        case "reset":return makeFreezedObj(state, {count: 1});
        default: throw new Error("등록되어 있지 않는 action입니다.");
    }   
};

const state = createStore(reducer);
```
```javascript
// redux.js
export const makeFreezedObj = (originObj = Object.create(null), newObj) => {
    return Object.freeze({...originObj, ...newObj});
};

export const createStore = (reducer) => {
    let state;
    const getState = () => ({...state});
    
    return {getState};
}
```

​    

​    

### 6 . 변경 로직은 외부에서 호출해서 반영한다.

변경 로직을 외부에서 주입받은 것 까지는 좋았는데 외부에서 어떻게 호출을 해야 할까? 이것을 위해 dispatch라는 메서드를 만들고 상태에 반영될 수 있도록 만든다.

```javascript
// index.js
import {createStore, makeFreezedObj} from "./redux.js";

// 비즈니스 로직을 외부에서 생성한다.
const reducer = (state = makeFreezedObj(), action) => {
	switch(action) {
        case "increment": return makeFreezedObj(state, {count: (state.count ?? 1)+1 });
        case "reset":return makeFreezedObj(state, {count: 1});
        default: throw new Error("등록되어 있지 않는 action입니다.");
    }   
};

// 객체 생성시 비즈니스 로직을 주입한다.
const state = createStore(reducer);
```

```javascript
// redux.js
export const makeFreezedObj = (originObj = Object.create(null), newObj) => {
    return Object.freeze({...originObj, ...newObj});
};

export const createStore = (reducer) => {
    let state;
    const getState = () => ({...state});
    
    // 외부에서 받은 reducer에 다시 해당하는 명령어를 받도록 한다.
    const dispatch = (action) => {state = reducer(state, action);}
    
    return {getState, dispatch};
}
```

​    

​    

### 7 . 변경사항 발생 : reset 값을 정한다.

또 다시 요구사항이 추가되었다. reset 명령어에 초기화 값을 반영할 수 있게 해달라고 한다. 기존의 action 명령어는 string 타입이라서 전달을 할수가 없다. 그러니 이것을 객체 방식으로 만들자. 

객체로 만들 때 action의 type으로 해당 명령어를 정의하고 그외의 값들에 대해서는 프로퍼티로 추가하자.

> 여기서 중요한 점은 요구사항이 내려왔지만 이제 redux.js에는 변경이 되지 않는다는 점이다
> 요구사항으로 인한 변경이 redux.js가 아닌 사용자 영역인 index.js에서만 일어난다

```javascript
// index.js
import {createStore, makeFreezedObj} from "./redux.js";

const reducer = (state = makeFreezedObj(), action) => {
	switch(action.type) {
        case "increment": return makeFreezedObj(state, {count: (state.count ?? 1)+1 });
        case "reset":return makeFreezedObj(state, {count: action.resetValue?? 1});
        default: throw new Error("등록되어 있지 않는 action입니다.");
    }   
};

const state = createStore(reducer);

// 객체로 변경해서 입력한다. {type, 기타 값들}
state.dispatch({type : "increment"});
state.dispatch({type : "reset", resetValue: 0});
```

```javascript
// redux.js
export const makeFreezedObj = (originObj = Object.create(null), newObj) => {
    return Object.freeze({...originObj, ...newObj});
};

export const createStore = (reducer) => {
    let state;
    const getState = () => ({...state});
    
    // 외부에서 받은 reducer에 다시 해당하는 명령어를 받도록 한다.
    const dispatch = (action) => {state = reducer(state, action);}
    
    return {getState, dispatch};
}
```

​    

​    

### 8 . action 객체를 만들어서 강제하자.

자바, 타입스트립트 등에 있는 interface와 유사하게 class를 이용해서 따라해 보자. 해당하는 action 명령은 해당 Action 객체로만 받을  수 있게 만들어서 좀더 실수의 여지를 줄일 수 있게 해보자. 일종의 dispatch와 사용자 측의 계약이라고 보면 되지 않을까?

```javascript
// index.js
import {createStore, makeFreezedObj, Action} from "./redux.js";

const reducer = (state = makeFreezedObj(), action) => {
	switch(action.type) {
        case "increment": return makeFreezedObj(state, {count: (state.count ?? 1)+1 });
        case "reset":return makeFreezedObj(state, {count: action.resetValue?? 1});
        default: throw Error("등록되어 있지 않는 action입니다.");
    }   
};

const state = createStore(reducer);
state.dispatch(new Action("increment"));
state.dispatch(new Action("reset", {resetValue: 0}));
```

```javascript
// redux.js
export const makeFreezedObj = (originObj = Object.create(null), newObj) => {
    return Object.freeze({...originObj, ...newObj});
};

export const createStore = (reducer) => {
    let state;
    const getState = () => ({...state});
    

    const dispatch = (action) => {
        // Action을 체크한다.
        if(!(action instanceof Action)) throw Error("action은 Action 객체이어야 합니다.");
        state = reducer(state, action);
    }
    return {getState, dispatch};
}

// Action을 추가
export class Action {
    constructor(type, otherState) {
        if(type === undefined) throw Error("type은 반드시 있어야 합니다.");
        
        this.type = type;
        Object.assign(this, otherState);
    }
}
```

​    

​    

### 9 . subscribe를 만들자

상태의 변경에 대해서는 어느정도 만들어진 것 같다. 이제 상태가 변경되었을 때 반응할 수 있는 함수들을 추가할 수 있게 subscribe를 만들어 보자. 중복을 줄이기 위해서 Set을 활용했다. 이제 상태가 변경되었을 때 자동으로 실행시켜 보자.

```javascript
// index.js
import { createStore, makeFreezedObj, Action } from "./redux.js";

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

```

```javascript
// redux.js
export const makeFreezedObj = (originObj = Object.create(null), newObj) => {
  return Object.freeze({ ...originObj, ...newObj });
};

export const createStore = (reducer) => {
  let state;
  const getState = () => ({ ...state });

  // subscribe를 추가했다.
  const listeners = new Set();
  const subscribe = (fn) => listeners.add(fn);
  const publish = () => listeners.forEach((listener) => listener());

  const dispatch = (action) => {
    if (!(action instanceof Action))
      throw Error("action은 Action 객체이어야 합니다.");
    state = reducer(state, action);
    publish();
  };
  return { getState, dispatch, subscribe };
};

export class Action {
  constructor(type, otherState) {
    if (type === undefined) throw Error("type은 반드시 있어야 합니다.");

    this.type = type;
    Object.assign(this, otherState);
  }
}
```

​    

​    

### 10 . 이제 실행 결과를 보자.

위의 코드들은 https://codesandbox.io/s/frosty-bhabha-10kf0?file=/src/redux.js 의 console 화면에서 실행이 가능하다.