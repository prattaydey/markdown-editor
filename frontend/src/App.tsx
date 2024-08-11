// import styled, { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";
import File from "./pages/File";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <File />} />
    </Routes>
  )
};

export default App
