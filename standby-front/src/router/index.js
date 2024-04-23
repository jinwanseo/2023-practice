import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Join from "../pages/Join";
import Login from "../pages/Login";
import path from "./path";

const router = createBrowserRouter([
  {
    path: path.base,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: path.login,
        element: <Login />,
      },
      {
        path: path.join,
        element: <Join />,
      },
    ],
  },
]);

export default router;
