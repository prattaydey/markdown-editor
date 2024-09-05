// import styled, { createGlobalStyle } from "styled-components";
import { Navigate, Route, Routes } from "react-router-dom";
import File from "./pages/File";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.ts";
import { useEffect, useState } from "react";
import { Document } from "./types.ts";
import API_BASE_URL from "./apiConfig.ts";

function App() {
  const user = useRecoilValue(userAtom)
  const username = user?.username;
  const [files, setFiles] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const fileId = files.length > 0 ? files[0]._id : null;

  useEffect(() => {
    const handleUserFiles = async() => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/files/user/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          setIsLoading(false); // Set loading to false if there's an error
          return;
        }
        setFiles(data)
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading to false if there's an error
      }
    };
    if (username) {
      handleUserFiles()
    }
  }, [username]); // Dependency on username to refetch files if it changes

  // Render only after data has been fetched and loading is complete
  if (user && isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${username}/${fileId}`} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${username}/${fileId}`} /> : <Signup />} />
      <Route path="/:username/:fileId" element={user ? <File files={files} setFiles={setFiles}/> : <Navigate to="/" />} />
    </Routes>
  )
};

export default App
