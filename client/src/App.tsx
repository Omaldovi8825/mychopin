import ListasRecientes from './components/ListasRecientes'
import NuevaLista from './components/NuevaLista'
import type { Lista } from './types/lista'

import { useState, useEffect } from 'react'
import { Api } from './utils/ApiCalls'

function App() {
  const [listasRecientes, setListasRecientes] = useState<Lista[]>([])

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

  const guardarLista = async (nuevaLista: string[]) => {
    try {
      await Api.post('listas', nuevaLista)
      traerListas()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <NuevaLista guardarLista={guardarLista} />
      <ListasRecientes listasRecientes={listasRecientes} />
    </div>
  )
}

export default App
