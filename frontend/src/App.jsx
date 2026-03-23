import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Chat from './pages/ChatPage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import NotFound from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
