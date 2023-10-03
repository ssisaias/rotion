import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Routes } from './routes'
import './styles/global.css'

export function App(): JSX.Element {
  return (
    <div className="h-screen w-screen text-rotion-100 flex">
      <Sidebar></Sidebar>
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />

        <Routes />
      </div>
    </div>
  )
}
