import { wrapStore } from "webext-redux";

import createStore from "../store";

chrome.storage.local.get("state", obj => {
  const { state } = obj;
  const initialState = JSON.parse(state || "{}");

  const store = createStore(initialState);
  wrapStore(store, { portName: "TEST_CARD_STORE" });
});
