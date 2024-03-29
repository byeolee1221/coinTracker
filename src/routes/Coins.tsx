import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

const DarkTheme = styled.button`
  padding: .3rem .5rem;
  margin: .5rem;
  background-color: #ced4da;
  border: none;
  border-radius: .5rem;
  cursor: pointer;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color .2s ease-in;
    display: flex;
    padding: 20px;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>
          CoinMarket
        </title>
      </Helmet>
      <Header>
        <Title>CoinMarket</Title>
        <DarkTheme onClick={toggleDarkAtom}>다크 모드</DarkTheme>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> :
        <CoinsList>
        {data?.slice(0, 100).map((coin) =>
          <Coin key={coin.id}>
            <Link to={`${coin.id}`} state={coin.name}>
              <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
              {coin.name} &rarr;
            </Link>
          </Coin>
        )}
      </CoinsList>}
    </Container>
  )
}

export default Coins;