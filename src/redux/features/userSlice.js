import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  user: [],
};
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      state.user = actions.payload;
      // state.user = [...current(state.user), actions.payload];
    },
  },
});

export const {updateUser} = userInfoSlice.actions;

export const userInfo = state => state.user.user;

export default userInfoSlice.reducer;
