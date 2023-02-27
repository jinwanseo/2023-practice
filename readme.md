# NEST JS [주말 학습]

## 개요

1. 설치
2. 구조
3. 컨트롤러 생성

## 설치

```js
// nestjs cli 설치
npm i -g @nestjs/cli

// 정상 설치 확인
nest

// 프로젝트 생성
nest new

```

## 구조

### 실행 순서 (흐름)

1. main.ts
2. module
3. controller (route / service연결)

## entities

- 타입 정의 (클래스로 👈 여기서 왜 interface를 사용을하지 않는지에 대해 알아보기 / 사용가능하긴 한데 보통은 class로 사용하는 듯)

## DTO

- Data Transfer Object의 약자로 데이터를 객체로 변환하는 class (즉, 객체로 변환하여 타입 검사 등을 하기 위함 / 여기서는 interface를 사용하지 않는데, class-validator (데코레이터를 통한 타입검사)를 하기 위한 것으로 이해 함)

### 추가 설치 모듈

```js
// class에서 데코레이터를 활용한 validation check
npm i class-validator
// class에서 데코레이터를 활용한 데이터 변경
npm i class-transformer
// dto 클래스간 상속시 모든 속성 optional로 변경 (create 👉 update 유용)
npm i @nestjs/mapped-types
```

### 실행 순서 (흐름)

1. main.ts
   ```js
   // 글로벌 미들웨어 추가
   app.useGlobalPipees(
     // validation 체크 전용 파이프
     new ValidationPipe({
       // dto에 정의 되지 않은 타입은 서버에 도달하지 못하도록 설정
       whitelist: true,
       // dto에 없는 값은 에러메시지 송출
       forbidNonWhitelisted: true,
       // 보통 컨트롤러에서 param을 받을때 string으로 받게 되는데
       // 형변환이 필요한 경우 transform 사용 (ex: controller에서 pk param 값을 number로 설정시 string -> number로 자동 형변환)
       transform: true,
     }),
   );
   ```
2. dto/create-movie.dto.ts

- 예제 코드

```js
import { IsNumber, IsOptional, IsString } from 'class-validator';
// Class Validator 를 활용한 타입 체크 / 에러 메시지 송출 ⭐️
export class CreateMovieDto {
  @IsString({ message: 'title의 타입은 String 입니다.' })
  readonly title: string;
  @IsNumber({}, { message: 'year의 타입은 number 입니다' })
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}

```

3. controller / service

- 컨트롤러에서 클라이언트가 전송한 데이터 (Param으로 들어오는 데이터)의 타입을 dto에서 선언한 class로 설정
