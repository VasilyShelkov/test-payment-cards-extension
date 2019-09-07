import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { RootState } from "typesafe-actions";

import storage from "./storageMiddleware";
import rootReducer from "./rootReducer";

export default (initialState: RootState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(storage as any))
  );
};
