import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeVar, disableDarkMode, enableDarkMode } from "apollo";
import styled from "styled-components";
import { LogoTitle } from "./Heading";
import IconButton from "./IconButton";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export default function HeaderBar() {
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <Header>
      <LogoTitle>Standby Togeter</LogoTitle>
      <IconButton onClick={isDarkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} size="lg" />
      </IconButton>
    </Header>
  );
}
