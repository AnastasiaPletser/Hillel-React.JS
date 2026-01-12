import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App.js";
import UserStore from "./store/UserStore";

import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";

export const Context = createContext(null);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <App />
    </Context.Provider>
  </ApolloProvider>
);
