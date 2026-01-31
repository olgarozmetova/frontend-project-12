import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5002/login', {
        username,
        password,
      })

      return response.data // { token, user }
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
        state.token = payload.token
        localStorage.setItem('token', payload.token)
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'error'
        state.error = payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
