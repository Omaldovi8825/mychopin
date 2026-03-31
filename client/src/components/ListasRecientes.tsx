import type { Lista } from '../types/lista'
import Header from './Header'
import type { ProductoLista } from '../types/producto'

interface propsListasRecientes {
  listasRecientes: Lista[]
  nuevaLista: ProductoLista[]
  setNuevaLista: React.Dispatch<React.SetStateAction<ProductoLista[]>>
}

const formatoFecha = (fecha: Lista['fecha']) => {
  return new Date(fecha).toLocaleDateString('es-MX')
}

function ListasRecientes({
  listasRecientes,
  nuevaLista,
  setNuevaLista,
}: propsListasRecientes) {
  const pasarListasRecientes = (i: string) => {
    const encontrarDuplicado = nuevaLista.some(p => p.nombre === i)
    if (!encontrarDuplicado) {
      setNuevaLista(prev => [...prev, { nombre: i, checked: false }])
    }
  }
  return (
    <section className="row">
      <Header titulo="Listas recientes" />
      {listasRecientes.map(lista => (
        <div key={lista._id} className="col-12 col-md-6 col-lg-4 mb-3">
          <p className="bg-dark text-white text-center py-2 mb-0">
            {formatoFecha(lista.fecha)}
          </p>
          <ul className="list-unstyled border p-2 mb-0">
            {lista.items.map(i => (
              <li key={i} className="d-flex justify-content-between mb-2">
                <span>{i}</span>
                <button onClick={() => pasarListasRecientes(i)} className="btn">
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default ListasRecientes
