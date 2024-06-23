import { combineReducers } from "@reduxjs/toolkit";
import recipeReducer from "./recipeReducer";
import authReducer from "./authReducer";
import saveReducer from "./saveReducer";
import likeReducer from "./likeReducer";
import profileReducer from "./profileReducer";

const rootReducers = combineReducers({
  recipe: recipeReducer,
  auth: authReducer,
  likes: likeReducer,
  profile: profileReducer,
});
export default rootReducers;
