import styled from "styled-components"

const Title = styled.h1 `
  color: ${p=>p.theme.pointColor}
`

function Coins() {
  return (
    <Title>Coins</Title>
  )
}

export default Coins