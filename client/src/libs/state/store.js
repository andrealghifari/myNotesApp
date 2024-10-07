import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./userStore";
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;