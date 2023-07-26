import React from "react"
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store"
import { I18nextProvider } from 'react-i18next'; // Add this line
import i18n from './i18n/i18n'; // Import the i18n configuration file

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
