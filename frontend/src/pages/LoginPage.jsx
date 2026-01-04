import React from 'react'
import { Formik, Form, Field } from 'formik'

function Login() {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={() => {}}
    >
      <Form>
        <div>
          <label htmlFor="username">Имя пользователя</label>
          <Field
            id="username"
            name="username"
            type="text"
            placeholder="Введите имя пользователя"
          />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
          />
        </div>

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  )
}

export default Login
