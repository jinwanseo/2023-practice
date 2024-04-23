import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import client from "./apollo";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </ApolloProvider>
);
