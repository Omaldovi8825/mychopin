export interface Producto {
  nombre: string
  cantidad: string | number
}

export interface ProductoLista extends Producto {
  checked: boolean
}
