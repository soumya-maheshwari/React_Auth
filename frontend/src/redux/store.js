import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
// import userReducer from "./index";
import authReducer from "./authSlice";
// const persistConfig = {
//   key: "root",
//   storage: localStorage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  // red
  reducer: {
    auth: authReducer,
  },
});

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

// const persistor = persistStore(store);
// export { persistor };
// // export default store;
