import ListasRecientes from './components/ListasRecientes'
import NuevaLista from './components/NuevaLista'
import type { ProductoLista } from './types/producto'
import type { Lista } from './types/lista'

import { useState, useEffect } from 'react'
import { Api } from './utils/ApiCalls'

function App() {
  const [listasRecientes, setListasRecientes] = useState<Lista[]>([])
  const [nuevaLista, setNuevaLista] = useState<ProductoLista[]>([])
  const [sugerencias, setSugerencias] = useState<string[]>([])

  const traerListas = async () => {
    try {
      const res = await Api.get('listas')
      const resultadoListas = res.data
      const preSugerencias: string[] = []
      for (const lista of resultadoListas) {
        for (const itemsLista of lista.items) {
          const valoresMinusculas = itemsLista.toLowerCase()
          if (!preSugerencias.includes(valoresMinusculas)) {
            preSugerencias.push(valoresMinusculas)
          }
        }
      }
      console.log(preSugerencias)
      setListasRecientes(resultadoListas)
      setSugerencias(preSugerencias)
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

  const pasarProducto = (producto: string) => {
    const productoSinEspacios = producto.trim()
    const encontrarDuplicado = nuevaLista.some(
      p => p.nombre.toLowerCase() === productoSinEspacios.toLowerCase(),
    )
    if (!encontrarDuplicado && productoSinEspacios) {
      setNuevaLista(prev => [
        ...prev,
        { nombre: productoSinEspacios, checked: false },
      ])
    }
  }

  return (
    <div className="container">
      <NuevaLista
        guardarLista={guardarLista}
        nuevaLista={nuevaLista}
        setNuevaLista={setNuevaLista}
        pasarProducto={pasarProducto}
        sugerencias={sugerencias}
      />
      <ListasRecientes
        listasRecientes={listasRecientes}
        pasarProducto={pasarProducto}
      />
    </div>
  )
}

export default App
