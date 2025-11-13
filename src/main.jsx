import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import App from "./App.jsx";
import { config } from "./config/apollo.js";

const client = new ApolloClient({
  link: new HttpLink({
    uri: config.uri,
    headers: config.headers,
  }),
  cache: new InMemoryCache(config.cacheConfig),
  defaultOptions: config.defaultOptions,
});

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
