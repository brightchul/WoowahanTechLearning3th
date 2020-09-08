const el = (tag) => document.createElement(tag);
const isFunction = (str) => str.includes("function") || str.includes("=>");
const isString = (target) => typeof target === "string";

const setProps = (el, props) => {
  Object.keys(props).forEach((key) => {
    if (isFunction(props[key])) el.setAttribute(key, `(${props[key]})()`);
    else el.setAttribute(key, props[key]);
  });

  return el;
};

/**
 * VDOM의 children 배열을 받아다가 fragment 객체로 반환한다.
 * @param {Array} children
 */
const makeChildrenElement = (children) => {
  const childrenElement = children.reduce((fragment, child) => {
    if (isString(child)) {
      fragment.appendChild(document.createTextNode(child));
    } else {
      fragment.appendChild(renderElement(child));
    }

    return fragment;
  }, new DocumentFragment());

  return childrenElement;
};

/**
 * 외부의 의존성을 줄이고 element만 반환하기 위해 내부 renderElement 함수를 따로 만들었다.
 * @param {object} obj
 */
function renderElement(obj) {
  const element = setProps(el(obj.tag), obj.props);
  const childrenElement = makeChildrenElement(obj.children);
  element.appendChild(childrenElement);

  return element;
}

export function render(obj) {
  const element = renderElement(obj);
  document.body.appendChild(element);
}
