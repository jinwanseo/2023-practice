import React from "react";
import { useNavigate } from "react-router-dom";
import { logManagerOut } from "../apollo";

function Home(props) {
  const navigator = useNavigate();
  return (
    <div>
      Hello
      <button onClick={() => logManagerOut(navigator)}>log out</button>
    </div>
  );
}

export default Home;
