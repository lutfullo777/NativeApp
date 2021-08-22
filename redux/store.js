import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  loginReducer,
  todoReducer,
  getTodoReducer,
  getTaskReducer,
  getDoneReducer,
  getDoneScreenReducer,
  noDoneReducer,
  getNodoneReducer,
} from "./reducer";

const rootReducer = combineReducers({
  loginReducer,
  todoReducer,
  getTodoReducer,
  getTaskReducer,
  getDoneReducer,
  getDoneScreenReducer,
  noDoneReducer,
  getNodoneReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
