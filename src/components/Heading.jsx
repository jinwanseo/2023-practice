import styled from "styled-components";

export const StyledTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  user-select: none;
`;
export const LogoTitle = styled(StyledTitle)`
  text-transform: uppercase;
  cursor: pointer;
`;

export const SubTitle = styled(StyledTitle)`
  font-size: 22px;
  font-weight: 700;
`;
export const Caption = styled(StyledTitle)`
  font-size: 14px;
  font-weight: 400;
`;
