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
    //   refetchInterval: 5000   // api 무료사용 제한 때문에 주석처리
    // }
  );

  return (
    <div>{isLoading ? "Loading chart..."
      : <ApexChart
        type="candlestick"
        series={[
          {
            name: coinId,
            data: data?.map((price) => ({
              x: new Date(price.time_close), 
              y: [price.open, price.low, price.high, price.close]
            })) ?? []   // data가 없으면 빈 배열을 반환
          }  
        ]}
        options={{
          chart: { height: 300, width: 500, toolbar: { show: false }, background: "transparent" },
          xaxis: { type: "datetime" },
          theme: { mode: "dark" }
        }}
      />}</div>
  )
}

export default Chart;