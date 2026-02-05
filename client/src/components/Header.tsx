interface HeaderProps {
  titulo: string
}

function Header({ titulo }: HeaderProps) {
  return <h2 className="text-center bg-info text-white py-3 mb-4">{titulo}</h2>
}

export default Header
