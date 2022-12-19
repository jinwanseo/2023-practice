import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  success: "#2ecc71",
  fontColor: "#2c3e50",
  bgColor: "#ecf0f1",
  borderColor: "#2c3e50",
};

export const darkTheme = {
  success: "#27ae60",
  fontColor: "#ecf0f1",
  bgColor: "#2c3e50",
  borderColor: "#7f8c8d",
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
      border-color: ${(props) => props.theme.borderColor};
      font-family: 'Open Sans', sans-serif;

    }
    a {
      text-decoration: none;
      color : ${(props) => props.theme.fontColor};
    }
`;
