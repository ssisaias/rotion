import { QueryClientProvider } from 'react-query'
import { Routes } from './routes'
import './styles/global.css'
import { queryClient } from './lib/react-query'

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
