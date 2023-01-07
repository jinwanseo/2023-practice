# Styled Component

> 🏆 Styled Components를 왜 사용하는가 ?
>
> 리액트 Web 과 리액트 Native는 미세하게 Style 설정이 다르다.
>
> mui 같은 프레임 워크를 사용하더라도 native 용은 없기에 각각 다시 CSS를 작성해야 하는 경우가 있는데,
>
> Styled-Components 사용시 CSS 설정은 다소 번거롭지만 한번 작성해놓으면 WEB 과 App 간의 연동이 가능하다.

## 기본 문법

```jsx
import styled from "styled-components";

// 기본 노드에 스타일 사용
const StyledButton = styled.button`
  width: 120px;
  color: white;
  bacground-color: tomato;
`;

// 스타일 된 노드를 상속해서 사용
const StyledSuccessButton = styled(StyledButton)`
  background-color: green;
`;
```

## 확장 기능

> 단순 스타일 뿐 아니라 상태별 스타일 변경도 가능하다

### props 사용

```jsx
import styled from "styled-components";

const LikeButton = styled.button`
  width: 100px;
  color: white;
  bgcolor: ${(props) => (props.isLike ? "green" : "red")};
`;

function Post() {
  const [isLike, setIsLike] = useState(false);
  return (
    <React.Fragment>
      ....Post
      <LikeButton isLike={isLike} onClick={() => setIsLike(!isLike)} />
    </React.Fragment>
  );
}
```

### 태그 변경

> 컴포넌트의 스타일은 기존 그대로 유지하되 태그 이름만 변경하고 싶은 경우

```jsx
import styled from "styled-components";

const styledBtn = styled(Input).attr({
  as: "button",
})`
  margin-left: 10px;
`;
```
