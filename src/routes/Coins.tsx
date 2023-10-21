import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

interface ICoinsProps {}

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins({}: ICoinsProps) {
  const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
  `;

  const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
  `;

  const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const CoinsList = styled.ul``;

  const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
      transition: color 0.3s ease-in;
      // display: block;
      display: flex;
      align-items: center;
      padding: 20px;
    }

    &:hover {
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  `;

  const breathe = keyframes`
  0% {opacity:1;}
  50%{opacity:0.5;}
  100%{opacity:1;}
  `;
  const Loader = styled.span`
    color: red;
    text-align: center;
    animation: ${breathe} 2s infinite;
    display: block;
  `;

  const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-left: 5px;
  `;

  //useQuery
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  console.log(isLoading, "useQuery");
  console.log(data?.slice(0, 100), "useQuery");
  //useQuery

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (() => console.log(1))();
  // },[]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     //console.log(json.slice(0, 99));
  //     setLoading(false);
  //   })();
  // }, []);

  // console.log(coins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader> LOADING . . . </Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin, i) => (
            <Coin key={coin.name}>
              {/* <Link to={`/${coin.id}`}> */}
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                {i + 1}.
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
