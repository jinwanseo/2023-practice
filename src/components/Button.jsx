import styled from "styled-components";

const Button = styled.input`
  padding: 12px 16px;
  color: white;
  text-align: center;
  background-color: ${(props) => props.theme.info};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  &:hover {
    transform: scale(1.01);
    transition: all 150ms ease-in;
    box-shadow: 1px 1px 1px grey;
  }
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export default Button;
