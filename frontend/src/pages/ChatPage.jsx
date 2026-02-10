import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../socket/socket'
import api from '../api/api'

import { initApp } from '../store/initSlice'
import { addMessage } from '../store/messagesSlice'
import { setCurrentChannel } from '../store/channelsSlice'

import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from '../components/bootstrap'

const Chat = () => {
  const dispatch = useDispatch()

  const { list: channels, currentChannelId } = useSelector(
    state => state.channels,
  )
  const messages = useSelector(state => state.messages.list)

  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  // INIT: Receive data (channels + messages)
  useEffect(() => {
    dispatch(initApp())
  }, [dispatch])

  // Connect WebSocket
  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    socket.on('newMessage', message => {
      dispatch(addMessage(message))
    })

    return () => {
      socket.off('newMessage')
    }
  }, [dispatch])

  // Autoscroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentChannelId])

  // Send message
  const handleSubmit = async e => {
    e.preventDefault()
    if (!currentChannelId || !text.trim()) {
      return
    }

    setSending(true)

    try {
      await api.post('/messages', {
        body: text,
        channelId: currentChannelId,
      })
      setText('')
    } catch {
      alert('Ошибка отправки сообщения')
    } finally {
      setSending(false)
    }
  }

  const currentMessages = currentChannelId
    ? messages.filter(m => m.channelId === currentChannelId)
    : []

  const currentChannel = channels.find(c => c.id === currentChannelId)

  return (
    <Container
      fluid
      className="min-vh-100 my-4 overflow-hidden rounded shadow d-flex"
    >
      <Row className="flex-grow-1 bg-white w-100">
        {/* Channels */}
        <Col
          xs={4}
          md={2}
          className="border-end px-0 bg-light h-100 d-flex flex-column"
        >
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button variant="link" className="p-0 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-square"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>

              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <Nav
            id="channels-box"
            variant="pills"
            className="flex-column px-2 mb-3 overflow-auto h-100"
          >
            {channels.map(channel => (
              <Nav.Item key={channel.id} className="w-100">
                <Button
                  variant={
                    channel.id === currentChannelId ? 'secondary' : 'light'
                  }
                  className="w-100 rounded-0 text-start"
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              </Nav.Item>
            ))}
            {/*     
            <Nav.Item className="w-100">
              <Button
                variant="secondary"
                className="w-100 rounded-0 text-start"
              >
                <span className="me-1">#</span>
                random
              </Button>
            </Nav.Item>


            <Nav.Item className="w-100">
              <ButtonGroup className="d-flex w-100">
                <Button
                  variant="light"
                  className="w-100 rounded-0 text-start text-truncate"
                >
                  <span className="me-1">#</span>
                  list
                </Button>

                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    variant="light"
                    className="flex-grow-0"
                  >
                    <span className="visually-hidden">Управление каналом</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Удалить</Dropdown.Item>
                    <Dropdown.Item>Переименовать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Nav.Item> */}
          </Nav>
        </Col>
        {/* CHAT */}
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># {currentChannel?.name}</b>
              </p>
              <span className="text-muted">
                {currentMessages.length} сообщений
              </span>
            </div>
            {/* MESSAGES */}
            <div
              id="messages-box"
              className="chat-messages flex-grow-1 overflow-auto px-5"
            >
              {' '}
              {currentMessages.map(m => (
                <div key={m.id} className="text-break mb-2">
                  <b> {m.username} </b>: {m.body}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* INPUT */}
            <div id="input-message" className="px-5 py-3">
              <form
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                className="py-1 border rounded-2"
              >
                <div className="input-group has-validation">
                  <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                  />
                  <button
                    type="submit"
                    disabled={sending || !text.trim()}
                    className="btn btn-group-vertical"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-right-square"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                      />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Chat
