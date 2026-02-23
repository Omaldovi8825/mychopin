import { useState } from "react";
import type { ChangeEvent, FormEvent } from "../types/common";
import type { ProductoLista } from "../types/producto";
import Header from "./Header";

function NuevaLista() {
  const [nuevaLista, setNuevaLista] = useState<ProductoLista[]>([]);
  const [producto, setProducto] = useState("");

  const handleChange = ({ target }: ChangeEvent) => {
    const { value } = target;
    setProducto(value);
  };

  const agregarProducto = (ev: FormEvent) => {
    ev.preventDefault();
    const encontrarDuplicado = nuevaLista.some(
      (p) => p.nombre.toLowerCase() === producto.trim().toLowerCase(),
    );
    if (!encontrarDuplicado) {
      setNuevaLista((prev) => [
        ...prev,
        { nombre: producto.trim(), checked: false },
      ]);
      setProducto("");
    }
  };

  const toggleCheck = (nombre: string) => {
    const copiaProductos = [...nuevaLista];
    const index = copiaProductos.findIndex((p) => p.nombre === nombre);
    if (index >= 0) {
      copiaProductos[index] = {
        ...copiaProductos[index],
        checked: !copiaProductos[index].checked,
      };
      setNuevaLista(copiaProductos);
    } else {
      console.log("error al encontrar producto");
    }
  };

  const quitarProducto = (nombre: string) => {
    const listaFiltrada = nuevaLista.filter((p) => p.nombre !== nombre);
    setNuevaLista(listaFiltrada);
  };

  return (
    <section className="row mb-4">
      <Header titulo="Nueva Lista" />
      <div className="col-6 mb-3">
        <form onSubmit={agregarProducto} className="border p-3">
          <div className="mb-3">
            <label className="form-label">Producto</label>
            <input
              type="text"
              placeholder="Escribe el producto..."
              value={producto}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-6 d-flex align-items-end">
            <button className="btn btn-outline-primary w-100">Agregar +</button>
          </div>
        </form>
      </div>
      <div className="col-6 mb-3">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Check</th>
              <th>Quitar</th>
            </tr>
          </thead>
          <tbody>
            {nuevaLista.map((producto) => (
              <tr key={producto.nombre}>
                <td>{producto.nombre}</td>
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
        <div className="text-end">
          <button className="btn btn-outline-secondary">Guardar lista</button>
        </div>
      </div>
      <div>
        <p>Sugerencias:</p>
        <ul className="list-unstyled d-flex gap-2 m-0 p-0">
          <li>
            <button className="btn btn-sm btn-primary">Huevo</button>
          </li>
          <li>
            <button className="btn btn-sm btn-primary">leche</button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default NuevaLista;
