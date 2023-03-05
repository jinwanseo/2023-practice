import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    // Graphql 추가
    GraphQLModule.forRoot({
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
