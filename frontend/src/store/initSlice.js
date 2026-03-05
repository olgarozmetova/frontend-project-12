import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'
import { setChannels } from './channelsSlice'
import { setMessages } from './messagesSlice'

export const initApp = createAsyncThunk('app/init', async (_, { dispatch }) => {
  const [channelsRes, messagesRes] = await Promise.all([
    api.get('/channels'),
    api.get('/messages'),
  ])

  // Sending data to the store
  dispatch(setChannels(channelsRes.data))
  dispatch(setMessages(messagesRes.data))
})
