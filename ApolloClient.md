# Apollo Client 사용 기술 정리

## client 객체 생성

- apollo.js

```js
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

// Header 추가를 위한 http link 생성
const httpLink = createHttpLink({
  uri: "http://localhost:8888",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

// client 객체 생성
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
```

- index.js

```js
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
```

## query 사용

```js
import { gql, useQuery } from "@apollo/client";
const SEE_POST = gql`
  query SeePost {
    seePost {
      id
      title
      description
    }
  }
`;

export default function Post() {
  const { data } = useQuery(SEE_POST);
  return (
    <React.Fragment>
      {data?.seePost?.map((post) => (
        <Post key={`post-${post.id}`} {...post} />
      ))}
    </React.Fragment>
  );
}
```

## mutation 사용

```js
import { gql, useMutation } from "@apollo/client";

// mutation 사용 파일 상단에 Mutation String 작성
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const onSubmit = (e) => {
    const username = e.taret.username;
    const password = e.target.password;
    login({
      variables: {
        username,
        password,
      },
    }).then(({ data }) => {
      const {
        login: { ok, error, token },
      } = data;
      if (!ok) {
        // ... 에러 처리
      }
      if (token) {
        //... 토큰 저장
      })
  };
  return (
    <form onSubmit={onSubmit}>
      ...
      <Button type="submit" disabled={loading}>
        로그인
      </Button>
    </form>
  );
}
```

## 데이터 전역 사용

- apollo.js

```js
import { makeVar } from "@apollo/client";
const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (navigate) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  navigate(routes.login, { replace: true });
};
```

- 전역 데이터 사용 .jsx

```js
import React from "react";
import { useReactiveVar } from "@apollo/client";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <React.Fragment>
      <Layout>{isLoggedIn ? <Home /> : <Login />}</Layout>
    </React.Fragment>
  );
}

export default App;
```
