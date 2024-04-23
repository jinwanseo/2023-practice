import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import "@fontsource/inter";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import "index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ReduxProvider store={store}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ReduxProvider>
);
