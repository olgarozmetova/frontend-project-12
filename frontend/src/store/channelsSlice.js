import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: [],
    currentChannelId: null,
    defaultChannelId: null,
  },
  reducers: {
    setChannels(state, action) {
      state.list = action.payload

      const generalChannel = action.payload.find(c => c.name === 'general')

      state.defaultChannelId =
        generalChannel?.id ?? action.payload[0]?.id ?? null
      state.currentChannelId = state.defaultChannelId
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload
    },
    addChannel(state, action) {
      state.list.push(action.payload)
    },
    removeChannel(state, action) {
      state.list = state.list.filter(c => c.id !== action.payload)
      // If the current channel is deleted switch to the default one
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = state.defaultChannelId
      }
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
