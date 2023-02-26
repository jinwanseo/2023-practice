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

```js
// ./src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

2. app.module.ts

```js
// ./src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  // 컨트롤러
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

3. app.controller.ts

```js
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // express router와 비슷한 역할
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  sayHello(): string {
    return 'hello NestJS';
  }
}
```

### 컨트롤러 생성

```js
// nest generate controller
nest g co
```
