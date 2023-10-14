import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string | undefined;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  //console.log(coinId, "chart");

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId!)
  );

  console.log(data, "charttttttttt");
  return (
    <div>
      {isLoading ? (
        "loading CHART..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "close price",
              data: data?.map((price) => price.close) as [],
              //OR data: data?.map((price) => parseFloat(price.close)) ?? []
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
