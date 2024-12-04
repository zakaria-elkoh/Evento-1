import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventsReducer from "./slices/eventSlice";
import participantReducer from "./slices/participntSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    participant: participantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
