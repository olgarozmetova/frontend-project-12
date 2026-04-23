# Chat (Slack)

### Hexlet tests and linter status:

[![Actions Status](https://github.com/olgarozmetova/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/olgarozmetova/frontend-project-12/actions)

## Description

Chat (Slack) is a real-time single-page chat application built with React. It allows users to register, log in, create channels, exchange messages, and manage chat rooms in a responsive interface.

## Live Demo

🔗 https://frontend-project-12-w81t.onrender.com/

---

## 🚀 Features

- User authentication (login / signup)
- Protected routes
- Real-time messaging with Socket.IO
- Create / rename / delete channels
- Automatic switching to default channel after deletion
- Profanity filter for messages and channel names
- Toast notifications
- Internationalization (i18next)
- Responsive UI with Bootstrap
- Error tracking with Rollbar
- Deployment on Render

---

## 🚀 Technologies

### Frontend

- React
- Redux Toolkit
- React Router DOM
- Axios
- Formik
- Yup
- React Bootstrap
- Socket.IO Client
- i18next
- React Toastify
- Leo Profanity
- Rollbar

### Backend

- Hexlet Chat Server

---

## 🔧 Installation and Setup

```bash
git clone https://github.com/olgarozmetova/frontend-project-12.git
cd frontend-project-12

make install

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_ROLLBAR_ACCESS_TOKEN=your_rollbar_token`

## Production:

```bash
# 🔨 Build the project
make build

# ▶️ Start the server
make start

Open the application at: http://localhost:5001

```

## Run linter

```bash
make lint

```

## Main Features

### Authentication

- Registration
- Login
- Logout

### Channels

Users can:

- Create channels
- Rename channels
- Delete channels

### Messages

- Real-time chat
- Auto scroll
- Message counter

### Security

- Profanity filtering
- Toast notifications
- Error monitoring with Rollbar
