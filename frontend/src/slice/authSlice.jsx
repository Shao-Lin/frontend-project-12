import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;

      localStorage.setItem('token', token);
      localStorage.setItem('username', JSON.stringify(username));
    },
    logout: (state) => {
      state.username = null;
      state.token = null;

      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
