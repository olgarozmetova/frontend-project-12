import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Container, Navbar, Button } from './bootstrap'
import { logout } from '../store/authSlice'

function Header() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm w-100 px-5">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {t('header.brand')}
        </Navbar.Brand>

        {token && (
          <Button variant="primary" onClick={handleLogout}>
            {t('header.exit')}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
