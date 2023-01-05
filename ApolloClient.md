---
description: 아폴로 클라이언트 학습 중 주요 기술 정리
---

# Apollo Client 사용 기술 정리

## client 객체 생성

- apollo.js

```jsx
import { createHttpLink, InMemoryCache, makeVar } from "@apollo/client";

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

```jsx
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

```jsx
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

```jsx
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
    const username = e.taret.username.value;
    const password = e.target.password.value;
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
      }
    });
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

## refetchQueries 추가 호출

- Query / Mutation 호출 후 다른 Query / Mutation의 추가 호출이 필요할때
- ex) 좋아요 클릭시 결과 즉시 반영 (캐시 사용 없이 호출 하는 경우)
- 단점 : 리스트 목록이 많은 경우 모두 다시 받아온 후 재랜더링하기 때문에 캐시 직접 변경 권장 [캐시변경](#cache-변경)

```jsx
import React from "react";
import { gql, useMutation } from "@apollo/client";
const LIKE_MUTATION = gql`
  mutation ToggleLike($id: String!, $isLiked: Boolean!) {
    ToggleLike(id: $id, isLiked: $isLiked) {
      ok
      error
    }
  }
`;

export default function Post({ id, isLiked }) {
  const [like, { loading }] = useMutation(LIKE_MUTATION);
  const toggleLike = () => {
    like({
      variables: {
        id: id,
        isLiked: !isLiked,
      },
      // refetchQueries 사용시 다른 Query 재호출
      refetchQueries: [
        {
          query: POST_QUERY, //다른 query
          variables: {}, // variables가 필요한 경우
        },
      ],
    });
  };
  return (
    <React.Fragment>
      <>...</>
      <LikeBtn isLiked={isLiked} onClick={toggleLike} />
      <>...</>
    </React.Fragment>
  );
}
```

## Cache 변경

- Query / Mutation 호출 후 부분 화면 재랜더링이 필요한 경우 캐시 변경으로 가능

### All

```jsx
import React from "react";
import { gql, useMutation } from "@apollo/client";
const LIKE_MUTATION = gql`
  mutation ToggleLike($id: String!, $isLiked: Boolean!) {
    ToggleLike(id: $id, isLiked: $isLiked) {
      ok
      error
    }
  }
`;

export default function Post({ id, isLiked }) {
  const [like, { loading }] = useMutation(LIKE_MUTATION);
  const toggleLike = () => {
    like({
      variables: {
        id: id,
        isLiked: !isLiked,
      },
      // cache 업데이트 (result는 toggleLike 호출 후 응답 데이터)
      update : (cache, result) => {
        const {data : {toggleLike: {ok}}} = result;
        if(ok) {
          // fragmentId는 개발자 모드 > apollo cache상의 id 를 뜻한다
          const fragmentId =  `Post:${id}`;
          // fragment는 캐시 전용 query라고 생각하면됨
          const fragment = gql`
              fragment BSName on Post {
                isLiked
              }
            `;
          // 기존 캐시 조회 (readFragment)
          const {isLiked: cacheIsLiked, cacheLikes} = cache.readFragment({
            id: fragmentId,
            fragment: fragment,
          })

          // 캐시 변경 (writeFragment)
          cache.writeFragment({
            id: fragmentId,
            fragment: fragment
            // 변환 데이터 작성
            data: {
              isLiked : cacheIsLiked,
              likes : cacheIsLiked ? cacheLikes + 1 : cacheLikes -1,
            }
          })
        }
      }
    });
  };
  return (
    <React.Fragment>
      <>...</>
      <LikeBtn isLiked={isLiked} onClick={toggleLike} />
      <>...</>
    </React.Fragment>
  );
}
```

### 3.0 이상

```jsx
import React from "react";
import { gql, useMutation } from "@apollo/client";
const LIKE_MUTATION = gql`
  mutation ToggleLike($id: String!, $isLiked: Boolean!) {
    ToggleLike(id: $id, isLiked: $isLiked) {
      ok
      error
    }
  }
`;

export default function Post({ id, isLiked }) {
  const [like, { loading }] = useMutation(LIKE_MUTATION);
  const toggleLike = () => {
    like({
      variables: {
        id: id,
        isLiked: !isLiked,
      },
      // cache 업데이트 (result는 toggleLike 호출 후 응답 데이터)
      update: (cache, result) => {
        const {
          data: {
            toggleLike: { ok },
          },
        } = result;
        if (ok) {
          // fragmentId는 개발자 모드 > apollo cache상의 id 를 뜻한다
          const fragmentId = `Post:${id}`;
          cache.modify({
            id: fragmentId,
            fields: {
              isLiked: (prevVal) => !prevVal,
              likes: (prevVal) => (isLiked ? prevVal - 1 : preVal + 1),
            },
          });
        }
      },
    });
  };
  return (
    <React.Fragment>
      <>...</>
      <LikeBtn isLiked={isLiked} onClick={toggleLike} />
      <>...</>
    </React.Fragment>
  );
}
```

### Cache 조회

```jsx
const { author, description } = cache.readFragment({
  id: `Comment:${result.id}`,
  fragment: gql`
    fragment BSName on Comment {
      author
      decription
    }
  `,
});
```

### Cache 추가

- 캐시를 "추가" 하는 경우는 게시물 업로드시 추가 호출을 하지 않고 UI 출력을 위해 사용함

```jsx
const newCacheComment = cache.writeComment({
  fragment: gql`
    fragment BSName on Comment {
      author
      description
    }
  `,
  data: newComment,
});
```

### Cache 수정

```jsx
cache.modify({
  id: `Comment:${modifyId}`,
  fields: {
    author: (prev) => `from ${prev}`,
    decsription: (prev, { readField }) => `${prev} from ${readField("author")}`,
  },
});
```

### Cache 삭제

```jsx
cache.evict({
  id: `Comment:${removeId}`,
});
```

## 데이터 전역 사용

- apollo.js

```jsx
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

```jsx
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
