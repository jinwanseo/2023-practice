import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 앱 어디서나 config 모듈에 접근 가능 옵션
      isGlobal: true,
      // env file 위치
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      // production 모드일시 env 파일 무시
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'jinwanseo',
    //   database: 'nuber-eats',
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
    DatabaseModule,
    // 모듈
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
