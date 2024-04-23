import { LinearProgress } from "@mui/joy";
import useLoading from "app/hooks/useLoading";
import { Outlet } from "react-router-dom";

function App() {
  const { loading } = useLoading();

  return (
    <>
      {loading && <LinearProgress />}
      <Outlet />
      {/* <ThemeToggleBtn /> */}
    </>
  );
}

export default App;
