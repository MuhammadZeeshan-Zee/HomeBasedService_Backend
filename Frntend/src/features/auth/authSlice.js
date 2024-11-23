import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null,
  useRefreshToken: null,
  role: null, // for storing the JWT
  error: null,
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log("🚀 ~  action.payload:", action.payload)
      state.loading = action?.payload?.user ? true : false;
      state.isAuthenticated = action.payload?.user ? true : false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      //   state.role = action.payload.data.role;
    },
    removeUserInfo: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.loading = null;
      state.role = null;
      state.isAuthenticated = null;
    },
  },
});
export const { setUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;