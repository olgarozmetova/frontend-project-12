import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'

// Thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', { username, password })
      localStorage.setItem('token', data.token)
      return data.token
    } catch {
      return rejectWithValue('Неверный логин или пароль')
    }
  },
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    status: 'idle', // idle | loading | success | error
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.token = payload
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'error'
        state.error = payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
