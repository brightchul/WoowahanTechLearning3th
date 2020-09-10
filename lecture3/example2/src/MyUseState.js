import React from "react";
import ReactDOM from "react-dom";
import App from "./CompApp";

const stateValueMap = new WeakMap();
const stateFunctionMap = new WeakMap();

let prevfunctionalComponent = null;
let orderIdx = -1;

/**
 * React내에 강제로 렌더링을 하는게 있을텐데 못찾아서 임의로 만들었다..
 * 이 함수는 그냥 넘어가 주세요 ㅎㅎ;;
 */
function forceUpdate() {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode enabled={false}>
      <App />
    </React.StrictMode>,
    rootElement
  );
}

/**
 * 내부적으로 orderIdx를 함수 컴포넌트에 따라서 변경해준다.
 * @param {function} functionalComponent
 */
function changeStateOrderIdx(functionalComponent) {
  if (prevfunctionalComponent !== functionalComponent) {
    prevfunctionalComponent = functionalComponent;
    orderIdx = 0;
  } else {
    ++orderIdx;
  }
}

function getStateOrderIdx() {
  return orderIdx;
}

/**
 * 해당 함수 컴포넌트 전체가 아예 상태를 가지고 있지 않은지 확인
 * 해당 함수 컴포넌트 자체는 상태를 가지지만 그 내부에서 새로운 상태 추가인지 확인
 * @param {function} functionalComponent
 */
function isComponentStateInit(functionalComponent) {
  return (
    stateValueMap.has(functionalComponent) &&
    stateFunctionMap.get(functionalComponent)[getStateOrderIdx()]
  );
}

/**
 * 상태 배열, 상태변경함수 배열을 반환
 * @param {function} functionalComponent
 */
function getStateFunctionArr(functionalComponent) {
  if (!stateValueMap.has(functionalComponent)) stateValueMap.set(functionalComponent, []);
  if (!stateFunctionMap.has(functionalComponent)) stateFunctionMap.set(functionalComponent, []);

  return [stateValueMap.get(functionalComponent), stateFunctionMap.get(functionalComponent)];
}

/**
 * 상태 배열, 상태 변경 함수 초기화를 하는 함수
 * @param {function} functionalComponent
 * @param {any} initValue
 */
function setStateInit(functionalComponent, initValue) {
  const idx = getStateOrderIdx(functionalComponent);
  const [stateValueArr, stateFunctionArr] = getStateFunctionArr(functionalComponent);

  stateValueArr[idx] = initValue;
  stateFunctionArr[idx] = (value) => (stateValueArr[idx] = value) && forceUpdate();

  return [stateValueArr[idx], stateFunctionArr[idx]];
}

/**
 * 상태와 변경 함수를 가져오기 위한 함수
 * @param {function} functionalComponent
 */
function getStateAndFunction(functionalComponent) {
  const idx = getStateOrderIdx(functionalComponent);
  const [stateValueArr, stateFunctionArr] = getStateFunctionArr(functionalComponent);
  return [stateValueArr[idx], stateFunctionArr[idx]];
}

/**
 * useState를 파악하기 위해 만들어본 useMyState
 * 초기 값 체크를 해서 없으면 초기화, 아니면 값과 함수만 반환
 * @param {any} initValue 초기값
 * @param {function} functionalComponent 호출하는 함수 컴포넌트 의미
 */
export function useMyState(initValue, functionalComponent) {
  changeStateOrderIdx(functionalComponent);
  if (isComponentStateInit(functionalComponent)) {
    return getStateAndFunction(functionalComponent);
  } else {
    return setStateInit(functionalComponent, initValue);
  }
}
