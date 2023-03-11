# TypeScript Decorator

- TypeScript 에서 [비공식] 적으로 지원하는 데코레이터에 대해서 알아보자.

## 데코레이터란?

- 파라미터, 메소드, 클래스를 재정의 하거나 상속 등을 통해 오버로딩하지 않고 간편하게 실행 전 / 후 기능을 추가 하거나 기능을 수정 할수 있는 기법이다. 현재 NestJS에서 적극 적으로 사용 중이고 향후 정식 기능이 될 예정이다. (자바나 파이썬에서는 예전 부터 사용해 왔으나 타입스크립트에서는 아직은 공식적으로 지원하지 않는 언제든 변경이 가능한 문법)

## Function Decorator

- 함수형 데코레이터로 선언을 위한 2가지 중요 요건이 있다.
  > 요건
  >
  > 1. class내의 메소드만 가능하다.
  >
  > 2. 콜백 함수에 3개의 파라미터가 무조건 들어가야한다.
  >
  > - target: any
  > - propertyKey: string
  > - descriptor : PropertyDescriptor

### 예제

```typescript
function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
PropertyDescriptor    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

class ExampleClass {
  @first()
  method() {}
}
```

## Class Decorator

- 클래스 데코레이터로 선언을 위한 중요 요건이 있다.
  > 요건
  >
  > constructor 파라미터를 받아 해당 파라미터로 클래스를 제어한다.

## 예제

```typescript
interface Human {
  name: string;
  age: number;
  health?: number;
}
@UserBase
class User implements Human {
  constructor(public name: string, public age: number) {}
  intro() {
    console.log("hello~~");
  }
}

function UserBase(constructor: typeof User) {
  const saveFunc = constructor.prototype.intro;
  constructor.prototype.intro = () => {
    saveFunc();
    console.log("who?");
  };
}

const jwseo = new User("jinwan", 37);
jwseo.intro();
```
