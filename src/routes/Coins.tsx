import { Link } from "react-router-dom";
import styled from "styled-components";

function Coins() {
  const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
  `;

  const Container = styled.div``;

  const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const CoinsList = styled.ul`
    padding: 0px 20px;
  `;

  const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    //
    border-radius: 15px;
    a {
      transition: color 0.3s ease-in;
      display: block;
      padding: 20px;
    }

    &:hover {
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  `;

  const coins = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "eth-ethereum",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "hex-hex",
      name: "HEX",
      symbol: "HEX",
      rank: 3,
      is_new: false,
      is_active: true,
      type: "token",
    },
  ];

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.name}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;
