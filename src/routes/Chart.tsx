import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";

interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
const Chart = () => {
  const {coinId} = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
    // {
    //   refetchInterval: 5000
    // }
  );

  return (
    <div>{isLoading ? "Loading chart..."
      : <ApexChart
        type="line"
        series={[
          {
            name: "price",
            data: data?.map((price) => price.close) as number[]
          }
        ]}
        options={{
          theme: { mode: "dark" },
          chart: { height: 300, width: 500, toolbar: { show: false }, background: "transparent" },
          grid: { show: false },
          stroke: { curve: "smooth", width: 3 },
          yaxis: { show: false },
          xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: data?.map((price) => price.time_close),
            type: "datetime"
          },
          fill: { type: "gradient", gradient: { gradientToColors: ["#00a5cf"], stops: [0, 100] } },
          colors: ["#7ae582"],
          tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}`}}
    }} />}</div>
  )
}

export default Chart;