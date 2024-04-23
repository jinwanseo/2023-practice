import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // dto에 정의하지 않은 타입은 서버에 도달하지 못하도록 설정
      whitelist: true,
      // dto에 없는값 에러 메시지 송출
      forbidNonWhitelisted: true,
      // 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
      // 일반적으로 param으로 들어오는 값은 string (이럴때) 필요한 것이
      // 형변환인데 복잡한 과정을 생략하기 위해 transform 옵션이 있음
      // transform 설정시 컨트롤러에서 정의한 타입으로 형변환 되어 들어옴
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
