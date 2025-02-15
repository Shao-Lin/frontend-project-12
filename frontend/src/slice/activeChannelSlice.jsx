import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: '1',
  nameActiveChannel: 'general',
  numberOfMessage: ' ',
};
const activeChannel = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeChannel = action.payload;
    },
    setNameActiveChannel: (state, action) => {
      state.nameActiveChannel = action.payload;
    },
    setNumberOfMessage: (state, action) => {
      state.numberOfMessage = action.payload;
    },
  },
});
export const { setActive, setNameActiveChannel, setNumberOfMessage } =
  activeChannel.actions;
export default activeChannel.reducer;
