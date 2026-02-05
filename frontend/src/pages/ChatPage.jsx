import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initApp } from '../store/initSlice'

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

  useEffect(() => {
    dispatch(initApp())
  }, [dispatch])

  return (
    <Container fluid className="min-vh-100 my-4 overflow-hidden rounded shadow">
      <Row className="min-vh-100 bg-white flex-md-row">
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
            {/* channel */}
            <Nav.Item className="w-100">
              <Button variant="light" className="w-100 rounded-0 text-start">
                <span className="me-1">#</span>
                general
              </Button>
            </Nav.Item>

            {/* active channel */}
            <Nav.Item className="w-100">
              <Button
                variant="secondary"
                className="w-100 rounded-0 text-start"
              >
                <span className="me-1">#</span>
                random
              </Button>
            </Nav.Item>

            {/* channel with dropdown */}
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
            </Nav.Item>
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># list</b>
              </p>
              <span className="text-muted">1 сообщение</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              <div className="text-break mb-2"></div>
            </div>
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                  />
                  <button
                    type="submit"
                    disabled
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
