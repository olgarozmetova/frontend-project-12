import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'
import { setChannels } from './channelsSlice'

export const initApp = createAsyncThunk('app/init', async (_, { dispatch }) => {
  const { data } = await api.get('/data')
  dispatch(setChannels(data.channels))
})
