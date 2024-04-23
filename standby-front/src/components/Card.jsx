import styled from "styled-components";

const Card = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
`;
export default Card;
