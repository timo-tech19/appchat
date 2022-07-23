import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./api/api";
import App from "./App";
import "./index.css";

const mountApp = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  return true;
};

let isCreated: boolean;

onAuthStateChanged(auth, (_user) => {
  if (!isCreated) {
    isCreated = mountApp();
  }
});
