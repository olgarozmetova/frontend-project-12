import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'

// POST /messages
export const sendMessage = createAsyncThunk('messages/send', async message => {
  const { data } = await api.post('/messages', message)
  return data
})

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {
    addMessage(state, action) {
      state.list.push(action.payload)
    },
    setMessages(state, action) {
      state.list = action.payload
    },
    removeMessagesByChannel(state, action) {
      state.list = state.list.filter(
        message => message.channelId !== action.payload,
      )
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, state => {
        state.status = 'loading'
      })
      .addCase(sendMessage.fulfilled, state => {
        state.status = 'idle'
      })
  },
})

export const { addMessage, setMessages, removeMessagesByChannel } =
  messagesSlice.actions
export default messagesSlice.reducer
