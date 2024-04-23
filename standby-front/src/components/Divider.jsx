const { default: styled } = require("styled-components");

const DividerContent = styled.div`
  margin: 20px 0;
  /* text-transform: uppercase; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: ${(props) => props.width};
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 400;
    color: #8e8e8e;
  }
`;

export default function Divider({ label }) {
  return (
    <DividerContent width={50 - label.length * 4 + "%"}>
      <div></div>
      <span>{label}</span>
      <div></div>
    </DividerContent>
  );
}
