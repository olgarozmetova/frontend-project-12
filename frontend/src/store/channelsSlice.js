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
    addChannel(state, action) {
      state.list.push(action.payload)
    },
    removeChannel(state, action) {
      state.list = state.list.filter(channel => channel.id !== action.payload)
    },
    renameChannel(state, action) {
      const { id, name } = action.payload
      const channel = state.list.find(c => c.id === id)
      if (channel) {
        channel.name = name
      }
    },
  },
})

export const {
  setChannels,
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions
export default channelsSlice.reducer
