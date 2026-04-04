export default {
  translation: {
    header: {
      brand: 'Hexlet Chat',
      exit: 'Выйти',
    },
    loginPage: {
      title: 'Войти',
      username: 'Ваш ник',
      usernamePlaceholder: 'Ваш ник',
      password: 'Пароль',
      passwordPlaceholder: 'Пароль',
      loginProcess: 'Вход...',
      login: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
      validation: {
        required: 'Обязательное поле',
      },
      error: 'Неверный логин или пароль',
    },
    signupPage: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      signupProcess: 'Регистрация...',
      signup: 'Зарегистрироваться',
      hasAccount: 'Уже есть аккаунт?',
      login: 'Войти',
      validation: {
        usernameLength: 'От 3 до 20 символов',
        passwordMin: 'Не менее 6 символов',
        passwordsMatch: 'Пароли должны совпадать',
        required: 'Обязательное поле',
      },
      errors: {
        userExists: 'Такой пользователь уже существует',
      },
    },
    notFoundPage: {
      notFound: 'Страница не найдена',
    },
    channels: {
      title: 'Каналы',
      rename: 'Переименовать',
      remove: 'Удалить',
      validation: {
        minLength: 'Минимум 3 символа',
        maxLength: 'Максимум 20 символов',
        required: 'Обязательное поле',
        duplicate: 'Имя уже используется',
      },
    },
    modals: {
      add: 'Добавить канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
      cancel: 'Отменить',
      send: 'Отправить',
      removeConfirm: 'Уверены?',
      loading: 'Загрузка...',
    },
    messages: {
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      newMessage: 'Новое сообщение',
    },
  },
}
