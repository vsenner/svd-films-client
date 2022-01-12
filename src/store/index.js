import {combineReducers, createStore} from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
});

const store = createStore(rootReducer);

export default store;