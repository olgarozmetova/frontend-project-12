import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: [],
    currentChannelId: null,
  },
  reducers: {
    setChannels(state, action) {
      state.list = action.payload
      state.currentChannelId = action.payload[0]?.id ?? null
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload
    },
  },
})

export const { setChannels, setCurrentChannel } = channelsSlice.actions
export default channelsSlice.reducer
