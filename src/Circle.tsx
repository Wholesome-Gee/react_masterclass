import { useState } from 'react';
import styled from 'styled-components'


interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
const Container = styled.div<ContainerProps>`
  width:100px;
  height:100px;
  background-color: ${(props)=>props.bgColor};
  border: 1px solid ${props=>props.borderColor};
  border-radius:50%;
`

interface CircleProps {
  bgColor: string;
  borderColor?:string;
  text?:string;
}
export default function Circle({bgColor, borderColor, text='default value'}:CircleProps) {
  const [value, setValue] = useState<number|string>(1)
  setValue('지용')
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  )
}