# Get Started Server

## Step 1: Install

- install npm modules

```
    npm install
```

- install postgreSQL

## Step2: Set Server

- create postgreSQL Database Table

```
    CREATE DATABASE standby;
```

- make .env file in root folder

- include database url, save

## Step3 : Start Server

```
    npm start
```

## TODO

> - [x] GraphQL SET
> - [x] Database SET
>   > - [x] Prisma Model SET
>   >   > - [x] User typeDefs / resolvers SET
>   >   > - [x] StandBy typeDefs / resolvers SET
>   >   > - [x] Manager typeDefs / resolvers SET
>   >   > - [x] Store typeDefs / resolvers SET
>   >   > - [ ] Photo typeDefs / resolvers SET

- [x] 유저가 대기 취소시, 유저 내 StandByList 개수가 없을시, 유저 객체도 삭제
- [x] StandByList 개수가 있을시, StandBy 정보만 삭제 (현재 적용 되어있음)
