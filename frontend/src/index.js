// index.js
import React from "react";
import ReactDOM from "react-dom";
import DisplayApp from "./display_content/DisplayApp";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { store, persistor } from "./backend/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DisplayApp />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
