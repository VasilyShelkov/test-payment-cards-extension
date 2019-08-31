import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "react-chrome-redux";
import { Provider } from "react-redux";

import Root from "./popup";
import "./index.css";

const store = new Store({
  portName: "TEST_CARD_STORE"
});

// wait for the store to connect to the background page
store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById("root")
  );
});
