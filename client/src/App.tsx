import ListasRecientes from './components/ListasRecientes'
import NuevaLista from './components/NuevaLista'
import { useState, useEffect } from 'react'
import { Api } from './utils/ApiCalls'

function App() {
  const [listasRecientes, setListasRecientes] = useState([])

  const traerListas = async () => {
    try {
      const res = await Api.get('listas')
      setListasRecientes(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    traerListas()
  }, [])

  return (
    <div className="container">
      <NuevaLista />
      <ListasRecientes listasRecientes={listasRecientes} />
    </div>
  )
}

export default App
