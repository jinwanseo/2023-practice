import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // .env 설치 필요 x, cross-env 설치 o
    ConfigModule.forRoot({
      // 앱 어디서나 config 모듈에 접근 가능 옵션
      isGlobal: true,
      // env file 위치 (주의 🔥 마지막에 .env로 끝나야함)
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      // production 모드일시 env 파일 무시
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),

    DatabaseModule,

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   username: process.env.DB_USERNAME,
    //   database: process.env.DB_DATABASE,
    //   synchronize: true,
    //   logging: true,
    // }),

    // Graphql 추가
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // inmemory 방식
      autoSchemaFile: true,
    }),
    RestaurantsModule,
    // 모듈
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
