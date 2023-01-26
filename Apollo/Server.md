# Server 구성 / 설정

## 레파지토리 생성

- github.com/new (레파지토리 생성)
- git clone 레파지토리 주소
- npm init -y
- git ignore 설정 (extension : gitignore 추천) -> node 선택
- readme.md 생성 (todo list) 생성
- commit / push

## 관련 모듈 설치

### Graphql 설치

- npm install @apollo/server graphql
- server.js 생성 및 코드 입력
  https://www.apollographql.com/docs/apollo-server/api/express-middleware

```js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
```

### nodemon 설치 / 설정

- npm i nodemon -D

### Babel 설치 / 설정

- node.js 버전이 각 다를수 있으므로 babel 의존하는것 추천!
- 📓 참고 : https://babeljs.io/setup#installation
- npm install @babel/core @babel/node --save-dev
- npm install @babel/preset-env --save-dev
- babel.config.json 파일 생성 및 설정
- package.json 변경

```js
"scripts" : {
    "start": "nodemon --exec babel-node -- server.js"
}
```

### ORM (Prisma) 설치 / 설정

- Prisma 설치

```js
npm install prisma --save-dev
```

- Prisma init

```js
npx prisma init
```

### Postgres 설치

```js
brew install postgresql@15
```

### Postico 설치

```js
brew install postico
```

### PostgresSQL 설정

1. postgreSQL 앱 켠다.
2. postgres 테이블 더블클릭
3. 터미널에서 CREATE DATABASE 데이터베이스명; 입력 후 엔터 (; 👈 빼먹지 않도록 주의)
4. .env 파일 내 DATABASE_URL 수정

```js
// 여기서 사용자명은 2번 항목에서 더블 클릭한 postgres가 된다.
// 여기서 데이터 베이스명은 3번 항목에서 설정한 데이터베이스명을 뜻한다.
DATABASE_URL =
  "postgresql://{사용자명}:randompassword@localhost:5432/{데이터베이스명}?schema=public";
```

### Prisma 설정

1. VSCode 익스텐션 설치 (Prisma)
2. Prisma 플러그인 설치 (1번만으로 자동 prettier - relation 생성 안될시)

```js
npm i prettier-plugin-prisma -D
```

3. schema 설정

```js
// Prisma > schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}

```

3. 모델 마이그레이션 하기

```js
npx prisma migrate dev
// 엔터 이후 마이그레이션 구분 이름 적고 엔터
```

4. client.js 생성 후 export

```js
// ./client.js
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
```

5. package.json 에 prisma studio 설정

```js
// ./package.json
"scripts": {
  "studio": "npx prisma studio"
}
```

6. Model 폴더 나누기 [예제 방식]

- User > user.mutation.js
- User > user.queries.js
- User > user.typeDefs.js

7. 스키마 merge

- graphql-tools 설치

```js
npm i @graphql-tools/load-files @graphql-tools/merge
```

```js
// schema.js
import path from "path";
import { fileURLToPath } from "url";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedTypeDefs = await loadFiles(
  path.join(__dirname, "**/*.typeDefs.js")
);
const loadedResolvers = await loadFiles(
  path.join(__dirname, "**/*.{mutations,queries}.js")
);
export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(loadedResolvers);
```

8. dotenv 설치

```js
npm i dotenv
```

```js
// server.js 최상단
import dotenv from "dotenv";
dotenv.config();
```
