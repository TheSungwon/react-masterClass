import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string | undefined;
}
function Chart({ coinId }: ChartProps) {
  //console.log(coinId, "chart");

  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId!)
  );

  console.log(data, "charttttttttt");
  return <h1>chart</h1>;
}

export default Chart;
