import {combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
});

const store = createStore(rootReducer);

export default store;