import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </RecoilRoot>
  // </StrictMode>,
)
