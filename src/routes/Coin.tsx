import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

function Coin() {
  const { coinId } = useParams();
  //console.log(coinId);

  interface RouteState {
    state: { name: string };
  }
  const { state } = useLocation() as RouteState; //react-router-dom v6부터 제네릭X
  // const {
  //   state: { name },
  // } = useLocation() as RouteState;
  // console.log(name);

  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <Title>{state?.name || "aaa......."}</Title>

      {loading ? "loading..." : <h1>coinId: {coinId}</h1>}
    </Container>
  );
}

export default Coin;
