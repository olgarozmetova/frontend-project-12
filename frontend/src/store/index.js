import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import channelsReducer from './channelsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
  },
})
