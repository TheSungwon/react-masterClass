import { useState, useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchTickerInfo } from "../api";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  flex-wrap: wrap;
`;

const OverviewItem = styled.div`
display:flex;
flex-direction:column;
align-items:center;

span: first-child{
  font-size-10px;
  font-weight:400;
  text-transform:uppercase;
  margin-bottom:5px;
}
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => {
    console.log(props, "aaaaaaaaaaaaaa");
    return props.isActive ? props.theme.accentColor : props.theme.textColor;
  }};
  a {
    display: block;
  }
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  price_usd: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      percent_from_price_ath: number;
      ath_date: string;
    };
  };
}
interface RouteState {
  state: { name: string };
}

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams<{ coinId: string }>();
  //console.log(coinId);

  //key값 가져오기
  //const result = Object.keys(temp1).join("\n")
  // console.log(result);

  //type가져오기
  //const type = Object.values(temp1).map(v => typeof v).join("\n")
  // console.log(type);

  //////
  const { state } = useLocation() as RouteState; //react-router-dom v6부터 제네릭X
  // const {
  //   state: { name },
  // } = useLocation() as RouteState;
  // console.log(name);

  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  // console.log(priceMatch);
  // console.log(chartMatch);

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     //console.log(infoData);

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     //console.log(priceData);

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]); //hook안에서 사용 한 것은 [], dependency를 넣어줘야 함
  //hook에서 사용 한 것은 coinId를 사용
  //coinId가 변하면 코드가 재실행 됨

  // const [loading, setLoading] = useState(true);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["coinInfo", coinId],
    () => fetchCoinInfo(coinId!),
    {
      refetchInterval: 60000,
    }
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ["tickerInfo", coinId],
    () => fetchTickerInfo(coinId!)
  );
  console.log(infoData, "info useQuery");
  console.log(tickerData, "tickeruseQuery");

  const loading = infoLoading || tickerLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {" "}
          {state?.name
            ? state.name
            : loading
            ? "loading........"
            : infoData?.name}
        </title>
      </Helmet>
      <Title>
        {state?.name
          ? state.name
          : loading
          ? "loading........"
          : infoData?.name}
      </Title>

      {loading ? (
        "loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE:</span>
              <span>{Number(tickerData?.price_usd).toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>

            {/* <OverviewItem>
              <span>Quoted: market cap</span>
              <span>{tickerData?.quotes.USD.market_cap}</span>
            </OverviewItem> */}
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path={"price"} element={<Price />} />
            <Route path={"chart"} element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
