import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get user from local storage
// const user = JSON.parse(localStorage.getItem("user"));
const backend = "http://localhost:5000/";
const initialState = {
  // user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  response: "",
  user: {},
};

// register user
// createAsyncThunk accepts three parameters: a string action type value, a payloadCreator callback, and an options object.
export const registerUser = createAsyncThunk("auth/register", async (data) => {
  return await axios
    .post(`${backend}register`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});
export const loginUser = createAsyncThunk("auth/login", async (data) => {
  return await axios
    .post(`${backend}login`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.response = action.payload.data.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

// export const { reset } = authSlice.actions;
export default authSlice.reducer;
