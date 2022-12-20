import styled from "styled-components";
import { StyledTitle } from "./Heading";

const HelperContent = styled(StyledTitle)`
  margin-top: -8px;
  font-size: 13px;
  color: tomato;
  padding-left: 3px;
`;

function HelperText({ children, ...props }) {
  return children ? <HelperContent {...props}>{children}</HelperContent> : "";
}

export default HelperText;
