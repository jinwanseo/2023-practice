import styled from "styled-components";

const Input = styled.input`
  min-width: 150px;
  border: 1px solid
    ${(props) => (props.error ? "tomato" : props.theme.borderColor)};
  padding: 8px 16px;
`;

export default Input;
