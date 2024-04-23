# 타입 스크립트 [주말 학습]

## 개요

1. 타입스크립트란?
2. 설치
3. 설정
4. type
5. interface
6. type과 interface 차이
7. generic 타입
8. oop 사용

## 타입 스크립트란?

> microsoft 에서 만든 Javascript에 타입을 추가한 확장 언어로 Javascript의 타입 및 객체 모형을 문서화 함으로 VsCode의 인텔리센스 기능을 극대화 할수 있고, 협업시에도 코드만으로 소통이 가능할만큼 개발자 편의를 위한 자바스크립트 확장 언어 이다.

## 설치

```js
// Typescript install
npm i -D typescript
// Typescript -> Javascript 자동 빌드 / 실행 (빌드 파일 생성 x)
npm i -D ts-node
// 노드 관련 모듈 타입 다운
npm i @types/node
// 노드몬 설치 (저장시마다 자동 ts-node 실행)
npm i -D nodemon
```

## 설정

- root 폴더에 tsconfig.json 생성

```js
// tsconfig.json
{
  // src 폴더 내 .ts 파일 감시
  "include": ["src"],
  // 타입 스크립트 컴파일 옵션 설정
  "compilerOptions": {
    // 컴파일 후 자바스크립트 파일이 생성될 위치 (./build)
    "outDir": "build",
    // 자바스크립트 컴파일 버전
    "target": "ES6",
    // 라이브러리 추가
    // 즉, 자바스크립트가 실행될 환경에 해당하는 라이브러리를 명시 해놓을시
    // 관련된 vscode type의 제안 등 인텔리센스 기능이 활성화됨
    // DOM -> document 관련 인텔리 센스 활성화 (타입 추가)
    // ES6 -> MATH 등의 ES6 기본 API 인텔리 센스 활성화 (타입 추가)
    "lib": ["ES6", "DOM"],
    // 엄격 모드 ON
    "strict": true,
    "esModuleInterop": true,
    "module": "CommonJS"
    // .ts 파일에 .js 파일 import 가능 여부
    // "allowJs": true
  }
}
```

- package.json 설정 (자동 컴파일 / 실행)

```js
"scripts": {
    // build 폴더로 빌드 결과 저장 (tsconfig.json에서 ourDir 설정시)
    "build": "tsc",
    // 빌드 이후 결과 확인 (tsc && npm run start 와 같음)
    "start": "node ./build/index.js"

    // nodemon -> ts-node src/index.ts 파일 변경시 마다 실행
    "dev": "nodemon --exec ts-node src/index.ts"
  },
```

- src 폴더 생성
- index.ts 생성 / 코드 작성

## type

### type 선언 / 사용

```js
// 타입 선언
type Health = number;
type Age = number | string;

// 함수 타입 선언
type Eat = (food: string) => void;

// 객체 타입 선언
type Person = {
  name: string,
  age: Age,
  health: Health,
  eat: Eat,
};

const person: Person = {
  name: "seojinwan",
  health: 10,
  eat: (food) => {
    return "good";
  },
};
```

## interface

### interface 선언 / 사용

```js
interface Person {
  name: string;
  age: number;
  eat: (food: string) => string;
}

const person: Person = {
  name: "jinwan",
  age: 37,
  eat: (food) => food + " good!",
};
```

## type 과 interface 차이

1. type과 interface는 선언시 문법에 약간의 차이가 있다. (type은 '=' 추가, interface는 '=' 없음)
2. type 은 여러 타입 합칠시 & 키워드를 사용해야함(중복 허용 x), interface는 중복 허용이 되므로 같은 이름으로 선언시 자동으로 합쳐진다.

```js
type Person = {
  name: string,
};
// 이렇게 & 연산자를 통해 합치기 가능
type Student = Person & {
  school: string,
};

interface Person {
  name: string;
}
// 같은 이름으로 합치기 가능
interface Person {
  school: string;
}
interface Student extends Person {
  score: number;
}
```

3. [가장 큰 차이점] type은 선언이 유연하다. (ex : 값도 enum처럼 타입으로 선언이 가능하고, string, number 등의 콘크리트 타입으로 사용 이 가능하다.) interface는 객체만 선언이 가능하다.

> ⭐️ 타입스크립트 커뮤니티에서의 권고사항
>
> 타입과 인터페이스는 모두 사용이 가능하나 타입은 타입 선언시 주로 사용하고 인터페이스는 객체 사용시 주로 사용하는 것을 권장한다.

## generic 타입

### 제네릭 타입 선언 / 사용

```js
function getPolymolphysm<T>(data: T) {
  return data;
}

getPolymolphysm < string > "hello";
getPolymolphysm < boolean > true;
getPolymolphysm < number > 100;
```

> 이름이 어렵지 generic 타입은 타입 중 unknown 과 성격이 비슷하다. 즉, 타입을 즉시 지정 하지 않고 타입의 다형성을 위한 기능이다.

## OOP 사용

### abscract

```js
abstract class Person {
    constructor(
        protected name : string,
        protected age: number
    ){}

    abstract getInformation(score: number): string
}


class Student extends Person {
    getInformation(score: number) {
        return `name: ${this.name}, age: ${this.age} score: ${score}`
    }
}
```

> Abstract 는 class의 추상화로 추상화 클래스에서 constructor 생성시, 상속 받는 class에 constructor를 생략할수 있다.
>
> 하지만 치명적인 단점이 있는데, 컴파일 후 자바스크립트 코드에 class 로 추가 된다는 점이다.
>
> 파일의 크기 등을 고려 한다면 다른 방법 ex: impletement 등을 사용하자

### implements

```js
type Score = {
    math : number,
    eng: number
};

interface Person {
    name : string,
    age: number,
    getInformation(score: string): string
}

class Student implements Person, Score {
    constructor(
        public name : string,
        public age : number,
        public math : number,
        public eng : number
    ){}

    getInformation(totalScore: string) {
        return `name : ${this.name}, age: ${this.age}, totalScore: ${totalScore}, math : ${this.math} english : ${this.eng}`
    }
}
```

> implements는 interface, type 등의 형태를 채택하여 사용하는 키워드로 abstract 와는 다르게 컴파일 후 자바스크립트 코드에 남아 있지 않다.
>
> 또한 여러 interface / type을 채택 할수 있으므로 사용성이 상당히 뛰어나다.
>
> 여기서도 치명적인 단점이 있는데 implements를 통해 채택된 객체는 public으로만 선언이 가능하다.
