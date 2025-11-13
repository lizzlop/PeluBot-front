export const config = {
  uri: import.meta.env.VITE_GRAPHQL_URI || "http://localhost:4000/graphql",
  headers: {
    "Content-Type": "application/json",
  },
  cacheConfig: {
    typePolicies: {},
  },
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
};
