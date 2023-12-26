import React from "react";
import ReactDOM from "react-dom";
import i18next from "i18next";
import { Provider } from "react-redux";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/ja_JP";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import messagesJapanese from "@common/translations/ja";
import messagesEnglish from "@common/translations/en";
import { theme } from "./theme";

import App from "./App";
import store from "./store";

import "./styles/index.scss";
// Import the Quill styles
import "react-quill/dist/quill.snow.css";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  debug: true,
  resources: {
    en: {
      translation: messagesEnglish,
    },
    ja: {
      translation: messagesJapanese,
    },
  },
  lng: "ja", // language to use
  fallbackLng: "ja",
});
dayjs.locale("ja");
const persistor = persistStore(store);

ReactDOM.render(
  <ConfigProvider theme={theme} locale={locale}>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </ConfigProvider>,
  document.getElementById("root"),
);
