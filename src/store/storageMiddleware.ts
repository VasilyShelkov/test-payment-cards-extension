import { Store, Dispatch } from "redux";
import { RootState } from "./rootReducer";

const saveState = (state: any) => {
  chrome.storage.local.set({ state: JSON.stringify(state) });
};

export default (store: Store<RootState>) => (next: Dispatch<any>) => (
  action: any
) => {
  next(action);
  saveState(store.getState());
};
