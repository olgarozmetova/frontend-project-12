import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'

// Thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', { username, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', username)
      return { token: data.token, username }
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
    username: localStorage.getItem('username'),
    status: 'idle', // idle | loading | success | error
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
    setAuth(state, action) {
      state.token = action.payload.token
      state.username = action.payload.username
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
        state.token = payload.token
        state.username = payload.username
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'error'
        state.error = payload
      })
  },
})

export const { logout, setAuth } = authSlice.actions
export default authSlice.reducer
