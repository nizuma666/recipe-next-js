import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./redux/reducers/rootReducers";
import { createWrapper } from "next-redux-wrapper";
import { thunk } from "redux-thunk";
import authMiddleware from "../services/likeMiddleware";
// import { thunk } from "redux-thunk";

const makeStore = () =>
  configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
export const wrapper = createWrapper(makeStore);
