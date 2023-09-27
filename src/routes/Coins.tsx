import styled from "styled-components";

function Coins() {
  const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 30px;
  `;

  return <Title>코인</Title>;
}

export default Coins;
