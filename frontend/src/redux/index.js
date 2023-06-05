import { combineReducers } from "redux";
import { authSlice } from "./authSlice";
const userReducer = combineReducers({
  auth: authSlice.reducer,
});

export default userReducer;
