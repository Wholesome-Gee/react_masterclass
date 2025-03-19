import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${props=>props.theme.bgColor}
`
const Button = styled.button`
  background-color: ${props=>props.theme.btnColor};
  color: ${props=>props.theme.textColor}
`

export default function App() {
  const [value, setValue] = useState('')

  function onChange(event:React.FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }
  function onSubmit (event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('hello ',value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder='username' />
        <button>Log in</button>
      </form>
      <Container>
        <Button>hello</Button>
      </Container>
    </div>
  )
}