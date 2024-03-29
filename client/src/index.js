import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/context/Contextprovider";

ReactDOM.render(
  <ContextProvider>
    {" "}
    {/* Corrected the casing of ContextProvider */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ContextProvider>,
  document.getElementById("root")
);