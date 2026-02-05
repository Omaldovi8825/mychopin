import { useState } from "react"

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type FormEvent = React.FormEvent<HTMLFormElement>

interface Producto {
  nombre: string
  cantidad: string | number
}

interface ProductoForma extends Producto {
  checked: boolean
}

const estaInicialProducto = {
  nombre: "",
  cantidad: "",
}

function App() {
  const [nuevaLista, setNuevaLista] = useState<ProductoForma[]>([])
  const [formProducto, setFormProducto] = useState(estaInicialProducto)

  const handleChangeProducto = ({ target }: ChangeEvent) => {
    const { name, value } = target
    setFormProducto((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const agregarProducto = (ev: FormEvent) => {
    ev.preventDefault()
    setNuevaLista((prev) => [...prev, { ...formProducto, checked: false }])
  }

  const toggleCheck = (nombre: string) => {
    const copiaProductos = [...nuevaLista]
    const index = copiaProductos.findIndex((p) => p.nombre === nombre)
    if (index >= 0) {
      copiaProductos[index] = {
        ...copiaProductos[index],
        checked: !copiaProductos[index].checked,
      }
      setNuevaLista(copiaProductos)
    } else {
      console.log("error al encontrar producto")
    }
  }

  const quitarProducto = (nombre: string) => {}

  return (
    <div className="container">
      <section className="row">
        <h2 className="text-center bg-info text-white py-3 mb-4">
          Nueva Lista
        </h2>
        <div className="col-6">
          <form onSubmit={agregarProducto} className="border p-3">
            <div className="mb-3">
              <label className="form-label">Producto</label>
              <input
                type="text"
                placeholder="Escribe el producto..."
                name="nombre"
                value={formProducto.nombre}
                onChange={handleChangeProducto}
                className="form-control"
              />
            </div>
            <div className="row">
              <div className="col-6">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formProducto.cantidad}
                  onChange={handleChangeProducto}
                  className="form-control"
                />
              </div>
              <div className="col-6 d-flex align-items-end">
                <button className="btn btn-outline-primary w-100">
                  Agregar +
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-6">
          <h3 className="fs-4 text-center">Lista de productos</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Check</th>
                <th>Quitar</th>
              </tr>
            </thead>
            <tbody>
              {nuevaLista.map((producto) => (
                <tr key={producto.nombre}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={producto.checked}
                      onChange={() => toggleCheck(producto.nombre)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => quitarProducto(producto.nombre)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="row">
        <h2>Listas recientes</h2>
      </section>
    </div>
  )
}

export default App
