import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PriceItemBox = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 15px;
`;

interface IPriceData {
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
};

interface PriceProps {
  coinId: string;
}

const Price = () => {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data: IPriceData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  return (
    <Container>
      {isLoading ? "Loading price..." : <Wrapper>
        <PriceItemBox>
          <h2>현재 가격: ${IPriceData?.quotes.USD.price.toFixed(2)}</h2>
        </PriceItemBox>
        <PriceItemBox>
          <h2>24시간 거래량: ${IPriceData?.quotes.USD.volume_24h.toFixed(2)}</h2>
        </PriceItemBox>
        <PriceItemBox>
          <h2>현재 시총: ${IPriceData?.quotes.USD.market_cap}</h2>
        </PriceItemBox>
        <PriceItemBox>
          <h2>최근 상한가: ${IPriceData?.quotes.USD.ath_price.toFixed(2)}</h2>
        </PriceItemBox>
        <PriceItemBox>
          <h2>최근 상한가 날짜: {IPriceData?.quotes.USD.ath_date}</h2>
        </PriceItemBox>
      </Wrapper>}
    </Container>
  )
}

export default Price;