import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import path from "./router/path";

const client = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

const MANAGER_TOKEN = "MANAGER_TOKEN";
export const managerLoginVar = makeVar(false);
export const logManagerIn = (token) => {
  localStorage.setItem(MANAGER_TOKEN, token);
  managerLoginVar(true);
};
export const logManagerOut = (navigator) => {
  localStorage.removeItem(MANAGER_TOKEN);
  managerLoginVar(false);
  navigator(path.login, { replace: true });
};

const DARK_MODE = "DARK_MODE";
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export default client;
