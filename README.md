# NESTJS로 백엔드 프로젝트

## NsetJs 설치

```js
nest g application
```

## Apollo Graphql 설치

```js
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```

## app.module.ts Graphql 연동

```ts
@Module({
  imports: [
    // Graphql 추가
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // inmemory 방식
      autoSchemaFile: true,
    }),
    // 모듈
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
