import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.info};
  font-weight: 800;
`;

export default StyledLink;
