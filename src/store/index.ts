import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import storage from "./storageMiddleware";

import rootReducer, { RootState } from "./rootReducer";

export default (initialState: RootState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(storage as any))
  );
};
