import { useState } from "react"
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

function Coin() {
  const [loading, setLoading] = useState(true)
  const {coinId} = useParams<RouteParams>()
  const {state} = useLocation<RouteLocation>()
  console.log(state.name);
  

  
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