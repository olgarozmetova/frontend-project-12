import { useEffect } from 'react'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'

import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from '../components/bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, status, error } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <Container fluid className="min-vh-100">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm bg-white">
            <Card.Body className="p-5">
              <Row>
                <Col
                  xs={12}
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Image src="/form.img.svg" roundedCircle alt="Войти" fluid />
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={values => {
                      dispatch(login(values))
                    }}
                  >
                    <FormikForm>
                      <h1 className="text-center mb-4">Войти</h1>
                      <Form.Group
                        className="mb-3 form-floating"
                        controlId="username"
                      >
                        <Field
                          name="username"
                          as={Form.Control}
                          type="text"
                          placeholder="Ваш ник"
                        />
                        <Form.Label>Ваш ник</Form.Label>
                      </Form.Group>

                      <Form.Group
                        className="mb-3 form-floating"
                        controlId="password"
                      >
                        <Field
                          name="password"
                          as={Form.Control}
                          type="password"
                          placeholder="Пароль"
                        />
                        <Form.Label>Пароль</Form.Label>
                      </Form.Group>

                      {error && <div className="text-danger mb-2">{error}</div>}

                      <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-100 mt-2 mb-3"
                        variant="outline-primary"
                      >
                        {status === 'loading' ? 'Вход...' : 'Войти'}
                      </Button>
                    </FormikForm>
                  </Formik>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
