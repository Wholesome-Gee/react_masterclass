import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { fetchCoins } from "../api"
import { Helmet } from "react-helmet"

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
const CoinsList = styled.ul``

const Coin = styled.li`
  background-color: #eee;
  color: ${props=>props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${props=>props.theme.pointColor};
    transition: color 0.2s ease-in-out;
  }
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`

// id, name, symbol, rank, is_new, is_active, type
interface ICoins {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}


export default function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>('allCoins',fetchCoins)

  return (
    <Container>
      <Helmet>
        <title>
          Coins
        </title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
        {
          isLoading 
          ?
          <Loading>Loading...</Loading>
          :
          <CoinsList>
            {data?.slice(0,100).map((coin)=>{
              return (
                <Link 
                  to={{
                    pathname: `/${coin.id}`,
                    state: {name:coin.name}
                  }}
                  key={coin.id}
                >
                  <Coin key={coin.id}>
                    <Img src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`}/>
                      {coin.name} &rarr;
                  </Coin>
                </Link>
              ) 
            })}
          </CoinsList>
        }
    </Container>
  )
}