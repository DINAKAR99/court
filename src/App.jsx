import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Parallaxx />} /> */}
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
