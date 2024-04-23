import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  success: "#2ecc71",
  info: "#4db5f9",
  fontColor: "#2c3e50",
  bgColor: "#fafafa",
  borderColor: "#dbdbdb",
};

export const darkTheme = {
  success: "#27ae60",
  info: "#4db5f9",
  fontColor: "#ecf0f1",
  bgColor: "#2c3e50",
  borderColor: "#dbdbdb",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    input {
        all : unset;
    }
    body {
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.fontColor};
      font-family: 'Open Sans', sans-serif;
    }
    a {
      text-decoration: none;
      color : ${(props) => props.theme.fontColor};
    }
`;
