# 간단한 예제

- 의도 : babel이 소스코드를 변환시켜 주는데 한번 나도 시도해 보자!



### 간단한 설명

- 바벨이 나오게 된 배경중 하나는 node.js가 나오면서 브라우저 없이 자바스크립트 런타임 환경이 가능하게 되었기 때문이다.
- 바벨은 기본적으로 AST를 만들어서 하지만 이 example 코드에서는 정규표현식으로 최소한만 파싱한다.
- 동작 정도만 파악하는 용도였기 때문에 document.body에 바로 appendChild를 실행한다.
- 파싱하면서 바로 render를 문자열안에 주입한다.
- 예제코드에만 맞게 html attribute, html tag등을 설정해서 동작이 제한적이다.

​    

### 사용법

1. 먼저 example 폴더에 들어온다.
2. `npm start` 를 한다.

​    

### 코드 실행 순서

1. src폴더에 myjsx 파일들을 사용자가 생성 (html코드와 유사한 형태)
2. convert.js에서 해당 파일들을 읽어들인 다음 자바스크립트 친화적인 형태로 코드를 변형한다.
3. 그 결과물을 output 폴더의 dist.js에 다 넣는다.
4. index.html에서 이 dist.js를 가져와서 실행한다.
5. 실행할 때 render.js의 render, renderElement 를 호출한다.
   ​
