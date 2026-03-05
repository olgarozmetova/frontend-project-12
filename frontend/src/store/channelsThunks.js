import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'

export const createChannel = createAsyncThunk(
  'channels/create',
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/channels', { name })
      return data
    } catch {
      return rejectWithValue('Ошибка создания канала')
    }
  },
)

export const deleteChannel = createAsyncThunk(
  'channels/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/channels/${id}`)
      return id
    } catch {
      return rejectWithValue('Ошибка удаления канала')
    }
  },
)

export const updateChannel = createAsyncThunk(
  'channels/rename',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/channels/${id}`, { name })
      return data
    } catch {
      return rejectWithValue('Ошибка переименования канала')
    }
  },
)
