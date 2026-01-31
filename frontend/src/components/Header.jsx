import { Link } from 'react-router-dom'
import { Container, Navbar } from './bootstrap'

function Header() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm w-100 px-5">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
