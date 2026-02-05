import ListasRecientes from "./components/ListasRecientes"
import NuevaLista from "./components/NuevaLista"

function App() {
  return (
    <div className="container">
      <NuevaLista />
      <ListasRecientes />
    </div>
  )
}

export default App
