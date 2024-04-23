import styled from "styled-components";

const MessageWrapper = styled.div`
  padding: 10px 15px;
  color: white;
  font-size: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.success};
`;

export default function Message({ children, ...props }) {
  return children ? <MessageWrapper>{children}</MessageWrapper> : "";
}
