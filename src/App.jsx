
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`
const Square = styled.div`
  background-color: ${props=>props.bg_color};
  width: 100px;
  height: 100px;
`
const Circle = styled(Square)`
  border-radius: 50%
`
const Text = styled.span`
  color: white;
`
const Button = styled.button`
  background-color: ${(props)=>props.bg_color};
  color: white;
  width: 100px;
`
const Input = styled.input.attrs({required:true})`
  width:100px;
  background-color: beige;
`
const Count = styled.span`
  font-size: 3rem;
`
const SmileBox = styled(Square)`
  animation: ${animation} 1s ease-in-out infinite;
  &:hover {
    border-radius: 50%
  }
  span {
    font-size: 2rem;
  }
  ${Count} {
    font-size: 2rem;
    color: red;
  }
`


// App component

function App() {
  return (
    <Header>
      <Square bg_color='teal'>
        <Text>Hello</Text>
      </Square>
      <Square bg_color='tomato'/>
      <Circle bg_color='orange'/>
      <Button bg_color='teal'>Click</Button>
      <Button bg_color='tomato'as='a' href='https://naver.com'>Go to Naver</Button>
      <Input/>
      <SmileBox bg_color='teal'>
        <span>☺️</span>
        <Count as='p'>30</Count>
      </SmileBox>
    </Header>
  )
}

export default App