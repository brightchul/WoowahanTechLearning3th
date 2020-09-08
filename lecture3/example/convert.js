import fs from "fs";

const ENCODING = "utf-8";
const INPUT_EXT = ".myjsx";
const OUTPUT_FileName = "dist.js";

const INPUT_PATH = "./src";
const OUTPUT_PATH = "./output";

const openTagArr = ["div", "ul", "li", "table", "p"];
const closeTagArr = ["/div", "/ul", "/li", "/table", "/p"];
const attributeArr = ["class", "id", "onclick"];

/**
 * 문자열 배열을 받은 다음 위의 객체 값들을 참고해서 vdom 객체같이 만들어준다.
 * @param {Array}} arr
 * @param {number} idx
 */
function convertVDOM(arr, idx = 0) {
  const obj = { tag: arr[idx], props: {}, children: [] };
  let child;

  for (let i = idx + 1; i < arr.length; i++) {
    switch (true) {
      case openTagArr.includes(arr[i]):
        [i, child] = convertVDOM(arr, i);
        obj.children.push(child);
        break;

      case closeTagArr.includes(arr[i]):
        return [i, obj];

      case attributeArr.includes(arr[i]):
        obj.props[arr[i++]] = arr[i];
        break;

      default:
        obj.children.push(arr[i]);
        break;
    }
  }
  return [i, obj];
}

/**
 * object타입으로 들어온 객체를 텍스트로 변환하고 render를 붙인다.
 * @param {object}} obj
 */
function convertText(obj) {
  return `\nrender(${JSON.stringify(obj)});`;
}

/**
 * 특정 경로안의 파일들을 읽어서 배열로 변환후 반환한다.
 * @param {string} inputDirPath
 * @param {string} fileName
 */
function readInputFileData(inputDirPath, fileName) {
  const data = fs.readFileSync(`${inputDirPath}/${fileName}${INPUT_EXT}`, ENCODING);
  const arr = data.match(/function {0,}.+}|[a-zA-Z/0-9ㄱ-ㅎ가-힣ㅏ-ㅣ]+|\(.+=>.+}/g);
  return arr;
}

/**
 * 특정 경로에 data를 js 파일형태로 저장한다.
 * @param {string} outputDirPath 결과값을 저장하려는 경로
 * @param {string} data 저장하려는 결과값
 */
function writeOutput(outputDirPath, data) {
  !fs.existsSync(outputDirPath) && fs.mkdirSync(outputDirPath);
  fs.writeFileSync(`${outputDirPath}/${OUTPUT_FileName}`, data, ENCODING);
}

/**
 * 실행 함수
 * @param {string} inputDirPath
 * @param {string} outputDirPath
 */
function run(inputDirPath, outputDirPath) {
  // 해당 파일내에 myjsx파일을 읽어온다.
  const fileList = fs.readdirSync(inputDirPath).filter((one) => one.includes(INPUT_EXT));

  // 첫 상단의 render를 import 한다.
  let result = `import {render} from "../render.js";`;

  // myjsx파일 내용을 읽어서 vdom형식의 텍스트로 바꾼다.
  result += fileList.reduce((txt, file) => {
    const fileName = file.split(".")[0];
    const arr = readInputFileData(inputDirPath, fileName);
    const [_, vDom] = convertVDOM(arr);
    const resultText = txt + convertText(vDom);

    return resultText;
  }, "");

  writeOutput(outputDirPath, result);
}

run(INPUT_PATH, OUTPUT_PATH);
