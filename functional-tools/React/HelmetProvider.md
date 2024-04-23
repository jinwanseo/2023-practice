# React Helmet Async

> 리액트 프로젝트 탭 명 동적 변경 모듈

## Install

```code
npm i react-helmet-async
```

## Usage

```jsx
import { Helmet, HelmetProvider } from "react-helmet-async";

const app = (
  <HelmetProvider>
    <Helmet>
      <title>원하는 탭이름</title>
    </Helmet>
    <App />
  </HelmetProvider>
);
```
