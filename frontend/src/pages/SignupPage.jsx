import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'
import { useTranslation } from 'react-i18next'
import { configureSignupSchema } from '../validation/signupSchema'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from '../components/bootstrap'

const Signup = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const schema = configureSignupSchema(t)

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
                  <Image
                    src="/form2.img.svg"
                    roundedCircle
                    alt="Регистрация"
                    fluid
                  />
                </Col>

                {/* Form */}
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                      try {
                        const { data } = await api.post('/signup', {
                          username: values.username,
                          password: values.password,
                        })

                        localStorage.setItem('token', data.token)
                        localStorage.setItem('username', data.username)

                        // update Redux
                        dispatch(
                          setAuth({
                            token: data.token,
                            username: data.username,
                          }),
                        )

                        navigate('/')
                      } catch (err) {
                        if (err.response?.status === 409) {
                          setErrors({
                            username: t('signupPage.errors.userExists'),
                          })
                        } else {
                          console.error(err)
                        }
                      } finally {
                        setSubmitting(false)
                      }
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <FormikForm>
                        <h1 className="text-center mb-4">
                          {t('signupPage.title')}
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
                            placeholder={t('signupPage.username')}
                            className={
                              errors.username && touched.username
                                ? 'is-invalid'
                                : ''
                            }
                          />
                          <Form.Label>{t('signupPage.username')}</Form.Label>
                          {errors.username && touched.username && (
                            <div className="invalid-feedback">
                              {errors.username}
                            </div>
                          )}
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
                            placeholder={t('signupPage.password')}
                            className={
                              errors.password && touched.password
                                ? 'is-invalid'
                                : ''
                            }
                          />
                          <Form.Label>{t('signupPage.password')}</Form.Label>
                          {errors.password && touched.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group
                          className="mb-3 form-floating"
                          controlId="confirmPassword"
                        >
                          <Field
                            name="confirmPassword"
                            as={Form.Control}
                            type="password"
                            placeholder={t('signupPage.passwordConfirmation')}
                            className={
                              errors.confirmPassword && touched.confirmPassword
                                ? 'is-invalid'
                                : ''
                            }
                          />
                          <Form.Label>
                            {t('signupPage.passwordConfirmation')}
                          </Form.Label>
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <div className="invalid-feedback">
                                {errors.confirmPassword}
                              </div>
                            )}
                        </Form.Group>

                        {/* Submit */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-100 mt-2 mb-3"
                          variant="outline-primary"
                        >
                          {isSubmitting
                            ? t('signupPage.signupProcess')
                            : t('signupPage.signup')}
                        </Button>
                      </FormikForm>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>

            {/* Footer */}
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signupPage.hasAccount')} </span>
                <Link to="/login">{t('signupPage.login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
