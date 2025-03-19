import { useState } from 'react'
import styled from 'styled-components'

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
    </div>
  )
}