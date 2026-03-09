import type { Lista } from '../types/lista'
import Header from './Header'

interface propsListasRecientes {
  listasRecientes: Lista[]
}

const formatoFecha = (fecha: Lista['fecha']) => {
  return new Date(fecha).toLocaleDateString('es-MX')
}

function ListasRecientes({ listasRecientes }: propsListasRecientes) {
  return (
    <section className="row">
      <Header titulo="Listas recientes" />
      {listasRecientes.map(lista => (
        <div key={lista._id}>
          <p>{formatoFecha(lista.fecha)}</p>
          <ul>
            {lista.items.map(i => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default ListasRecientes
