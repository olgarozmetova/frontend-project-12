import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
                {/* Image */}
                <Col
                  xs={12}
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Image src="/form.img.svg" roundedCircle alt="Войти" fluid />
                </Col>

                {/* Form */}
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={async values => {
                      try {
                        await dispatch(login(values)).unwrap()
                        navigate('/') // transition only after successful login
                      } catch (err) {
                        console.error(err)
                      }
                    }}
                  >
                    <FormikForm>
                      <h1 className="text-center mb-4">
                        {t('loginPage.title')}
                      </h1>

                      {/* Username */}
                      <Form.Group
                        className="mb-3 form-floating"
                        controlId="username"
                      >
                        <Field
                          name="username"
                          as={Form.Control}
                          type="text"
                          placeholder={t('loginPage.usernamePlaceholder')}
                        />
                        <Form.Label>{t('loginPage.username')}</Form.Label>
                      </Form.Group>

                      {/* Password */}
                      <Form.Group
                        className="mb-3 form-floating"
                        controlId="password"
                      >
                        <Field
                          name="password"
                          as={Form.Control}
                          type="password"
                          placeholder={t('loginPage.passwordPlaceholder')}
                        />
                        <Form.Label>{t('loginPage.password')}</Form.Label>
                      </Form.Group>

                      {error && <div className="text-danger mb-2">{error}</div>}

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-100 mt-2 mb-3"
                        variant="outline-primary"
                      >
                        {status === 'loading'
                          ? t('loginPage.loginProcess')
                          : t('loginPage.login')}
                      </Button>
                    </FormikForm>
                  </Formik>
                </Col>
              </Row>
            </Card.Body>

            {/* Footer */}
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.noAccount')} </span>
                <Link to="/signup">{t('loginPage.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
