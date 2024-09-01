// import styled, { createGlobalStyle } from "styled-components";
import { Navigate, Route, Routes } from "react-router-dom";
import File from "./pages/File";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.ts";

function App() {
  const user = useRecoilValue(userAtom)
  const username = user?.username;
  
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${username}/:id`} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${username}/:id`} /> : <Signup />} />
      <Route path="/:username/:fileId" element={user ? <File /> : <Navigate to="/" />} />
    </Routes>
  )
};

export default App
