import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import { homeSlice } from "./slicers/homeSlice";

const rootReducer = combineReducers({
  home: homeSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [reduxThunk],
});

export type AppDispatch = typeof store.dispatch;
export type TStore = ReturnType<typeof store.getState>;

export default store;
