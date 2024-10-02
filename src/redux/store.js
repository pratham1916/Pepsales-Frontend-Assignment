import { legacy_createStore, combineReducers } from "redux";
import { blockReducer, filterReducer } from "./reducer";

const rootReducer = combineReducers({
  blocks: blockReducer,
  filters: filterReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
