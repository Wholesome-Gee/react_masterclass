import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  padding: 0 20px;
  max-width:480px;
  margin: 0 auto;
`
const Header = styled.div`
  height:10vh;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Title = styled.h1 `
  font-size: 3rem;
  color: ${props=>props.theme.pointColor};
`
const Loading = styled.div`
  text-align: center;
`

interface RouteParams {
  coinId: string;
}
interface RouteLocation{
  name: string;
}
interface ICoinInfo{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceInfo{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: string;
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
      ath_date: number;
      percent_from_price_ath: number;
    }
  };
}
function Coin() {
  const [loading, setLoading] = useState(true)
  const {coinId} = useParams<RouteParams>()
  const {state} = useLocation<RouteLocation>()
  const [info, setInfo] = useState<ICoinInfo>()
  const [priceInfo, setPriceInfo] = useState<IPriceInfo>()
  console.log(state.name);

  useEffect(()=>{
    (async ()=>{
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await ( await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
      console.log('@',priceData);
      setInfo(infoData)
      setPriceInfo(priceData)
    })()
  },[])
  

  
  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
      </Header>
        {
          loading 
          ?
          <Loading>Loading...</Loading>
          :
          <div>Coin: {coinId}</div>
        }
    </Container>
  )
}

export default Coin