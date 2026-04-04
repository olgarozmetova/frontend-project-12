import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import socket from '../socket/socket'
import api from '../api/api'
import { initApp } from '../store/initSlice'
import { addMessage, removeMessagesByChannel } from '../store/messagesSlice'
import {
  setCurrentChannel,
  addChannel,
  renameChannel,
  removeChannel,
} from '../store/channelsSlice'
import {
  createChannel,
  deleteChannel,
  updateChannel,
} from '../store/channelsThunks'

import { Formik, Form as FormikForm, Field } from 'formik'
import * as yup from 'yup'

import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
  Modal,
} from '../components/bootstrap'

const Chat = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const {
    list: channels,
    currentChannelId,
    defaultChannelId,
  } = useSelector(state => state.channels)
  const messages = useSelector(state => state.messages.list)
  const username = useSelector(state => state.auth.username)

  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null) // return focus after sending

  // Modal states
  const [modalType, setModalType] = useState(null) // 'add', 'rename', 'remove'
  const [modalChannel, setModalChannel] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // INIT: Receive data (channels + messages)
  useEffect(() => {
    dispatch(initApp())
  }, [dispatch])

  // Connect WebSocket to subscribe to all events
  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    socket.on('newMessage', message => {
      dispatch(addMessage(message))
    })

    socket.on('newChannel', channel => {
      dispatch(addChannel(channel))
    })

    socket.on('renameChannel', channel => {
      dispatch(renameChannel({ id: channel.id, name: channel.name }))
    })

    // When another user deletes a channel, the messages are also deleted
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id))
      dispatch(removeMessagesByChannel(id))
    })

    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('renameChannel')
      socket.off('removeChannel')
    }
  }, [dispatch])

  // Autoscroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentChannelId])

  // Send message
  const handleSubmit = async e => {
    e.preventDefault()
    if (!currentChannelId || !text.trim()) return

    if (!username) {
      alert('Вы не авторизованы')
      return
    }

    setSending(true)

    try {
      await api.post('/messages', {
        body: text,
        channelId: currentChannelId,
        username, //pass the name of the current user
      })
      setText('')
      inputRef.current?.focus() // return focus to the input field
    } catch {
      alert('Ошибка отправки сообщения. Проверьте соединение.')
    } finally {
      setSending(false)
    }
  }

  // Modal helpers
  const openModal = (type, channel = null) => {
    setModalType(type)
    setModalChannel(channel)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalType(null)
    setModalChannel(null)
  }

  // Channel name validation
  const channelSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('channels.validation.minLength'))
      .max(20, t('channels.validation.maxLength'))
      .test(
        'unique',
        t('channels.validation.duplicate'),
        value => !channels.some(c => c.name === value),
      )
      .required(t('channels.validation.required')),
  })

  // Submitting the modal window form
  const handleModalSubmit = async (values, { setSubmitting }) => {
    try {
      if (modalType === 'add') {
        const channel = await dispatch(createChannel(values.name)).unwrap()
        // Switch to a new channel
        dispatch(setCurrentChannel(channel.id))
      } else if (modalType === 'rename') {
        await dispatch(
          updateChannel({ id: modalChannel.id, name: values.name }),
        ).unwrap()
      } else if (modalType === 'remove') {
        await dispatch(deleteChannel(modalChannel.id)).unwrap()
        // Switch to the default channel
        dispatch(setCurrentChannel(defaultChannelId))
      }
      closeModal()
    } catch (err) {
      console.error('Ошибка операции с каналом:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const currentChannel = channels.find(c => c.id === currentChannelId)
  const currentMessages = currentChannelId
    ? messages.filter(m => m.channelId === currentChannelId)
    : []

  return (
    <>
      <Container className="vh-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          {/* Channels */}
          <Col
            xs={4}
            md={2}
            className="border-end px-0 bg-light h-100 d-flex flex-column"
          >
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels.title')}</b>
              <Button
                variant="link"
                className="p-0 text-primary"
                onClick={() => openModal('add')}
              >
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
                  <ButtonGroup className="d-flex w-100">
                    <Button
                      variant={
                        channel.id === currentChannelId ? 'secondary' : 'light'
                      }
                      className="w-100 rounded-0 text-start text-truncate"
                      onClick={() => dispatch(setCurrentChannel(channel.id))}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </Button>
                    {channel.removable && (
                      <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle
                          split
                          variant={
                            channel.id === currentChannelId
                              ? 'secondary'
                              : 'light'
                          }
                        />
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => openModal('rename', channel)}
                          >
                            {t('channels.rename')}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => openModal('remove', channel)}
                          >
                            {t('channels.remove')}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </ButtonGroup>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          {/* CHAT */}
          <Col className="p-0 h-100 d-flex flex-column">
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
                {currentMessages.map(m => (
                  <div key={m.id} className="text-break mb-2">
                    <b>{m.username}</b>: {m.body}
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
                      ref={inputRef}
                      value={text}
                      onChange={e => setText(e.target.value)}
                      aria-label={t('messages.newMessage')}
                      placeholder={t('messages.placeholder')}
                      className="border-0 p-0 ps-2 form-control"
                      disabled={sending}
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
                      <span className="visually-hidden">
                        {t('messages.send')}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' && t('modals.add')}
            {modalType === 'rename' && t('modals.rename')}
            {modalType === 'remove' && t('modals.remove')}
          </Modal.Title>
        </Modal.Header>
        <Formik
          key={modalType}
          initialValues={{ name: modalChannel?.name ?? '' }}
          validationSchema={modalType !== 'remove' ? channelSchema : null}
          onSubmit={handleModalSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, touched, isSubmitting }) => (
            <FormikForm>
              <Modal.Body>
                {modalType !== 'remove' ? (
                  <>
                    <Field
                      name="name"
                      className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                      autoFocus
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </>
                ) : (
                  <p>{t('modals.removeConfirm')}</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  {t('modals.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant={modalType === 'remove' ? 'danger' : 'primary'}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t('modals.loading')
                    : modalType === 'remove'
                      ? t('channels.remove')
                      : t('modals.send')}
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default Chat
