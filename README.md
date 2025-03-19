npx create-react-app 프로젝트명 // #5.0
npm i prop-types // #5.1

---

컴포넌트는 jsx를 리턴하는 함수

---

리렌더링되는 조건
- state가 수정되면 컴포넌트가 리렌더링 된다.
- 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트도 리렌더링된다.
- props가 변경되면 자식컴포넌트가 리렌더링 된다.
- ContextAPI의 값이 변경되면 해당 값을 사용하는 모든 컴포넌트가 리렌더링

---

React.memo()  
이것은 부모 컴포넌트의 리렌더링으로 인해  
불필요한 자식 컴포넌트의 리렌더링이 발생하는 것을 방지한다.  
`const 컴포넌트명 = React.memo((props)=>{ 컴포넌트 작성 })`
```jsa
// 자식 컴포넌트
const Child = React.memo(({ count }) => {
  console.log("Child 렌더링");
  return <div>{count}</div>;
});

// 부모 컴포넌트
const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="이름 입력" 
      />
    </div>
  );
};

export default App;
```

---
 
PropTypes  
이것은 props에 type을 지정해주는것이다.  
`npm i prop-types`  
`컴포넌트명.propTypes = { count: PropTypes.number.isRequired }`   
컴포넌트의 prop인 count는 number타입이어야 하고 필수여야한다.  
타입이 스트링으로 이루어진 배열이어야 할땐 `PropTypes.arrayOf(PropTypes.string)` 이렇게 작성
```js
import PropTypes from 'prop-types';

const Component = ({ name, age }) => {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>당신의 나이는 {age}세입니다.</p>
    </div>
  );
};

Component.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};

export default Component;
```

---

create-react-app CSS 설정하는방법 (NMC React JS로 영화 웹서비스 만들기 #5.1)
```css
/* App.module.css */
.title {
  font-size: 2rem;
  font-weight: 600;
}
```
```js
//App.js 
import styles from './App.module.css';
export default function App() {
  return (
    <h1 className={styles.title}></h1>
  )
}
```

---
useEffect cleanup() (NMC React JS로 영화 웹서비스 만들기 #6.4)

`useEffect(()=>{ ... return()=>{ ... } }, [])`  
useEffect 내부에 return()=>{} 을 사용해서 컴포넌트 unmount시 실행 할 실행문을 작성할 수 있다.  

컴포넌트의 생명주기는   
mount , update, unmount, error handle 로 나눠진다.

1. mount   
  컴포넌트가 처음으로 렌더링 될 시 (= DOM에 처음 삽입 될 시)
2. update   
  컴포넌트의 props나 state가 업데이트 될 시
3. unmount  
  컴포넌트가 DOM에서 제거될 시
4. error handle  
  컴포넌트에서 오류가 발생했을 시 

---

src에 routes폴더, components폴더 생성  
routes폴더는 페이지들 담고
components는 페이지들을 구성하는 파트들을 담고

---

react-router-dom 사용법 (NMC React JS로 영화 웹서비스 만들기 #7.5)  
`npm i react-router-dom`  
```js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './routes/Home'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie" element={<Detail/>} />
      </Routes>
    </Router>
  )
}

export default App
```
BrowserRouter는 일반 도메인을 뜻함
- BrowserRouter는 일반 도메인 ex\) https://naver.com/  
- HashRouter는 #이 붙은 도메인 ex\) https://naver.com/#/  

URL 파라미터 받는방법  
`<Route path="/movie/:id" element={<Detail/>} />`
 - url/movie/66334 이런식의 url을 받으면 Detail Route가 출력됨


---

github로 프로젝트 배포하는방법 (NMC React JS로 영화 웹서비스 만들기 #7.7)  
`npm i gh-pages`  
`npm run build`  
package.json에 `"homepage":"https://wholesome-gee.github.io/project-name"` 추가
package.json의 scripts에 `"deploy":"gh-pages -d build"` , `"predeploy":"npm run build"` 추가  


# 리액트 마스터클래스 (노마드코더) 🔥🔥🔥🔥🔥🔥🔥🔥🔥

## #2 STYLED COMPONENTS
스타일 컴포넌트 로직 작성  
1. 컴포넌트를 선언 `const 컴포넌트이름`
2. 컴포넌트에 styled-components로 html 태그 부여 `const 컴포넌트이름 = styled.div`
3. 백틱기호를 사용하여 스타일링 
    ```js
    const Box = styled.div`width:100, height:100, background-color:teal`;
    ```
4. JSX에 컴포넌트 사용

스타일 컴포넌트가 알아서 클래스명을 붙혀준다. (ex) class="sc-jSgvazq"

---
### 2.1 Our First Styled Component
- `npm i styled-components`  
- `import styled from 'styled-components';`
- styled-components 샘플 베이스 코드

```js
// import
import styled from 'styled-components'

// styled-components로 html, css 정의
const Father = styled.div`
  display: flex;
`
const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`
const Text = styled.span`
  color: white;
`
export default function App() {
  return (
    <Father>
      <BoxOne>
        <Text>Hello</Text>
      </BoxOne>
      <BoxTwo/>
    </Father>
  )
}
```
---
### 2.2 Adapting and Extending
- props를 받아서 같은 styled-component이지만 다른 스타일링을 줄 수 있다.
  ```js
  import styled from 'styled-components'

  const Box = styled.div`
    background-color: ${(props)=>props.bgColor};
    width: 100px;
    height: 100px;
  `

  export default function App() {
    return (
      <div>
        <Box bgColor='teal'/>
        <Box bgColor='tomato'/>
      </div>
    )
  }
  ```

- 중괄호를 이용한 styled-component의 상속
  ```js
  import styled from 'styled-components'

  const Box = styled.div`
    background-color: ${(props)=>props.bgColor};
    width: 100px;
    height: 100px;
  `

  const Circle = styled(Box)`
    border-radius:50%
  `

  export default function App() {
    return (
      <div>
        <Box bgColor='teal'/>
        <Box bgColor='tomato'/>
        <Circle bgColor='orange'/>
      </div>
    )
  }
  ```
---
### 2.3 'As' and Attrs
- as 속성으로 styled-component의 html 태그를 변경할 수 있다.
- styled-component의 속성에 as='html태그'를 추가하면 해당 styled-component의 html태그가 변경됨.
  ```js

  import styled from 'styled-components'

  const Button = styled.button`
    background-color: ${(props)=>props.bg_color};
    color: white;
    width: 100px;
  `

  function App() {
    return (
      <>
        <Button bg_color='teal'>Click</Button>
        <Button bg_color='tomato' as='a' href='https://naver.com'>
          Naver
        </Button>
      </>
    )
  }

  export default App
  ```
- attrs를 사용하여 styled-component에 속성을 추가할 수 있다.
  ```js
  import styled from 'styled-components'

  const Input = styled.input.attrs({required:true})`
    width:100px;
    background-color: beige;
  `

  function App() {
    return (
      <>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
      </>
    )
  }

  export default App
  ```
---
### 2.4~2.5 Animations and Pseudo Selectors 
- styled-components로 animation 구현하는 방법
  - `import styled, { keyframes } from 'styled-components'`
  - styled-components 보다 윗 줄에 animation 작성성
    ```js
    import styled, { keyframes } from 'styled-components'

    // 360도 회전하는 애니메이션을 animation에 정의
    const animation = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `
    const Square = styled.div`
      background-color: ${props=>props.bg_color};
      width: 100px;
      height: 100px;
      animation: ${animation} 1s ease-in-out infinite;
    `

    export default function App() {
      return (
        <>
          <Square bg_color='tomato'/>
        </>
      )
    }
    ```
- Psuedo Seclctors 사용하는 방법 ( 가상 요소 선택자 )
  - nested 사용가능
  - '&'를 이용해서 Psuedo Selectiors 사용가능
    ```js
    import styled from 'styled-components'
    const Count = styled.span`
      font-size: 1rem;
    `
    const SmileBox = styled.div`
      width: 100px;
      height: 100px;
      border: 1px solid black;

      span {
        font-size: 32px;
      }

      &:hover {
        border-radius: 50%
      }

      ${Count} {
        font-size: 32px;
        color: red;
      }
    `

    export default function App() {
      return (
        <>
          <SmileBox>
            <span>☺️</span>
            <Count as='p'>30</Count>
          </SmileBox>
        </>
      )
    }
    ```
---
### 2.7 Themes (다크모드, 라이트모드 설정)
- main.jsx(index.jsx)에 `import {ThemeProvider} from 'styled-components' 추가  
- `<App/>`을 `<ThemeProvider theme={darkTheme}></ThemeProvider>`로 감싸준다.
- theme 정의 `const darkTheme = { textColor: "#eee", bgColor: "#333" }`
- <App/> 혹은 theme을 사용할 컴포넌트에서 theme을 적용시킨다.
  ```js
  // main.jsx
  ...
  import { ThemeProvider } from 'styled-components'

  const darkTheme = {
    textColor:"#eee",
    bgColor:"#333",
  }

  const lightTheme = {
    textColor:"#333",
    bgColor:"#eee",
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </StrictMode>,
  )

  // App.jsx
  import styled from 'styled-components'

  const Title = styled.h1`
    background-color: ${(props)=>props.theme.bgColor};
    color: ${(props)=>props.theme.textColor};
  `

  export default function App() {
    return (
      <Header>
        <Title>hello</Title>
      </Header>
    )
  }
  ```
---
### 코드 정리
```js
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'

const darkTheme = {
  textColor:"#eee",
  bgColor:"#333",
}

const lightTheme = {
  textColor:"#333",
  bgColor:"#eee",
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

// App.jsx
import styled, { keyframes } from 'styled-components' 

// 애니메이션 설정 (SmileBox에서 사용)
const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// styled-component 기본형 <Header/>
const Header = styled.header`
  display: flex;
  flex-direction: column;
`

// styled-component props 설정 <Square bg_color="teal"/>
const Square = styled.div`
  background-color: ${props=>props.bg_color};
  width: 100px;
  height: 100px;
`

// styled-component 상속(extend) <Circle bg_color="tomato"/>
const Circle = styled(Square)`
  border-radius: 50%
`

// styled-component 안에 작성된 styled-component <Square><Text/></Square>
const Text = styled.span`
  color: white;
`

// styled-component로 작성된 button을 as키워드를 사용하여 a태그로 변환
// <Button bg_color='tomato' as='a' href='/'/>
const Button = styled.button`
  background-color: ${(props)=>props.bg_color};
  color: white;
  width: 100px;
`

// styled-component에 attrs를 활용하여 html태그의 속성 부여하기 
const Input = styled.input.attrs({required:true})`
  width:100px;
  background-color: beige;
`

// styled-component 내부에 styled-component를 선택자로 지정하기
// 
const Count = styled.span`
  font-size: 2rem;
`

// styled-component 내부에 pseudo Selector 정의 span{}, &:hover{}...
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

// theme 적용하기 
// 먼저 main.jsx에서 ThemeProvider를 설정해주어야한다.
const Title = styled.h1`
  background-color: ${(props)=>props.theme.bgColor};
  color: ${(props)=>props.theme.textColor};
`

export default function App() {
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
      <Title>hello</Title>
    </Header>
  )
}
```
---
## #3 TYPESCRIPT
### 3.1 Definitely Typed
- 새로운 프로젝트를 시작할 경우
  - `npx create-react-app 프로젝트명 --template typescript`
  - 그냥 `npm init vite`에서 Typescript 선택해도 될듯
- 진행중인 프로젝트에 설치할 경우 
  - `npm i --save typescript @types/node @types/react @types/react-dom @types/jest`
- ts에서 js로 만들어진 library를 설치할 때
  - `npm i --svae-dev @types/라이브러리`
- 진행중인 프로젝트를 vite로 만들었을 경우
  - `npm i --save typescript @types/node @types/react @types/react-dom @types/jest`
  - `rpx tsc --init`
  - tsconfig.json의 "compilerOptions" 내부에 `"jsx":"react-jsx"` 추가
  - 모든 파일 확장자를 tsx로 변경
  - main.tsx에서 `createRoot(document.getElementById('root')).render(` 이부분을
    `createRoot(document.getElementById('root')!).render(` 이렇게 교체 (!만 추가)
---
### 3.2 Typing the Props
- PropTypes는 코드를 실행한 '후'에만 오류 확인이 가능하나
  TypeScript는 코드를 실행 '전'에 오류 확인이 가능하다.
- Component의 props를 type 하는 방법
  - interface는 object 내부의 type을 설명해주는것
    ```tsx
    interface ComponentProps {
      text: string;
    }
    export default Component({text}) {
      return ( 
        <div>{text}</div>
      )
    }
    ```
- styled-component의 prop을 type 하는 방법 (꺽쇠 사용)
  ```tsx
  interface HelloProps {
    color:string
  }
  const Hello = styled.h1<HelloProps>`
    color:${props=>props.color}
  `
  export default App() {
    return <Hello color='tomato'/>
  }
  ```
---
### 3.3 Optional Props
props의 type에 옵셔널, 기본값 설정하기
- 옵셔널 설정은 ? 로 한다.
  ```tsx
  interface HelloProps {
    color?:string;
    // color가 없을 시 undefined를 반환
    // color : string | undefined 와 같다.
  }
  ```
- 기본값 설정은 ?? 혹은 argument로 설정 가능하다.
  - ?? 를 사용한 기본값 설정
    ```tsx
    // App.tsx
    export default App () {
      return (
        <Hello/>
      )
    }
    // Hello.tsx
    interface HelloProps {
      color?: string;
    }
    export default Hello ({color}:HelloProps) {
      interface ShowHelloProps {
        color: string;
      }
      const ShowHello = styled.h1<ShowHelloProps>`
        color: ${props=>props.color}
      `
      return <ShowHello color={color ?? 'red'}>
    }
    ```
  - argument를 사용한 기본값 설정
    ```tsx
    // App.tsx
    export default App () {
      return (
        <Hello/>
      )
    }
    // Hello.tsx
    interface HelloProps {
      color?: string;
    }
    export default Hello ({color='red'}:HelloProps) {
      interface ShowHelloProps {
        color: string;
      }
      const ShowHello = styled.h1<ShowHelloProps>`
        color: ${props=>props.color}
      `
      return <ShowHello>
    }
    ```
--- 
### 3.4 State
state를 type하는 방법
- useState로 state의 초기값을 설정하면  
  typeScript는 초기값을 보고 해당 state의 type을 자동으로 지정해준다.
- 만약, 초기값과 다른 type을 state에 저장해야하는 경우  
  `const [value, setValue] = useState<number|string>(1)`  
  이와 같이 지정해줄 수 있다.
- 초기값을 설정안하면 undefined type이 된다.
### 3.5 Form (event)
이벤트리스너의 event에 type하는 방법
- `const onChange = (event:React.FormEvent<HTMLInputElement>) => { ... }`
  - input에 이벤트리스너를 걸었으면 HTMLInputElement,   
    form에 이벤트리스너를 걸었으면 HTMLFormElement