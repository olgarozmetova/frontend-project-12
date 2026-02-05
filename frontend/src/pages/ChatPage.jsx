import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initApp } from '../store/initSlice'

const Chat = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initApp())
  }, [dispatch])

  return (
    <div className="d-flex">
      <h1>Chat</h1>
    </div>
  )
}

export default Chat
