import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: '1',
};
const activeChannel = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});
export const { setActive } = activeChannel.actions;
export default activeChannel.reducer;
