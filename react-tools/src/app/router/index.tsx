import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import { Suspense, lazy } from "react";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Component {...props} />
    </Suspense>
  );
};
const Playground = Loadable(lazy(() => import("views/Playground")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Playground />,
      },
    ],
  },
]);

export default router;
