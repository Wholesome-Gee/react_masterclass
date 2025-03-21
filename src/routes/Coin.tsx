import { useEffect, useState } from "react"
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom"
import styled from "styled-components"
import Price from "./Price"
import Chart from "./Chart"
import { useQuery } from "react-query"
import { fetchCoinInfo, fetchCoinPrice } from "../api"

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
  padding: 10px 20px;
  border-radius: 10px;
`

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 11px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Description = styled.p `
 margin: 20px 0;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`

const Tab = styled.span<{active: string}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: rgba(0,0,0,0.5);
  padding: 7px 0;
  border-radius: 10px;
  color: ${props => props.active==='true' ? props.theme.pointColor : props.theme.textColor };
  a {
    display: block;
  }
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
  const {coinId} = useParams<RouteParams>()
  const {state} = useLocation<RouteLocation>()
  const priceMatch = useRouteMatch(`/${coinId}/price`)
  const chartMatch = useRouteMatch(`/${coinId}/chart`)
  const { isLoading: infoLoading, data: infoData , error: infoError } = useQuery<ICoinInfo>(["coinInfo",coinId], ()=> fetchCoinInfo(coinId))
  const { isLoading: priceLoading, data: priceData , error: priceError } = useQuery<IPriceInfo>(["coinPrice",coinId], ()=> fetchCoinPrice(coinId))
  const isLoading = infoLoading || priceLoading

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : isLoading ? 'Loading' : infoData?.name }</Title>
      </Header>
        {
          isLoading 
          ?
          <Loading>Loading...</Loading>
          :
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Open Source:</span>
                <span>{infoData?.open_source.toString().toUpperCase()}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
            <OverviewItem>
                <span>Total Supply:</span>
                <span>{priceData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{priceData?.max_supply}</span>
              </OverviewItem> 
            </Overview>
            <Tabs>
              <Tab active={`${chartMatch !== null}`}>
                <Link to={{
                  pathname: `/${coinId}/chart`
                }}>Chart
                </Link>
              </Tab>
              <Tab active={`${priceMatch !== null}`}>
                <Link to={{
                  pathname: `/${coinId}/price`
                }}>Price
                </Link>
              </Tab>
            </Tabs>
              <Switch>
                <Route path={`/:coinId/price`}>
                  <Price></Price>
                </Route>
                <Route path={`/:coinId/chart`}>
                  <Chart coinId={coinId}></Chart>
                </Route>
              </Switch>
          </>
        }
    </Container>
  )
}

export default Coin