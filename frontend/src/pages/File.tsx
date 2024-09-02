import { useEffect, useState } from "react"
import Editor from "../components/Editor";
import Preview from "../components/Preview"
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Document } from "../types";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useParams } from "react-router-dom";
import EmptyPage from "../components/EmptyPage";

interface FileProps {
  files: Document[];
  setFiles: React.Dispatch<React.SetStateAction<Document[]>>;
}

function File({ files, setFiles } : FileProps) {
  const user = useRecoilValue(userAtom);
  const { username, fileId } = useParams(); 
  const [fileName, setFileName] = useState("")
  const storedMarkdown = localStorage.getItem("MARKDOWN");
  const [markdown, setMarkdown] = useState(storedMarkdown ? storedMarkdown : '');
  const [isPreviewFull, setIsPreviewFull] = useState<boolean>(false);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  const callback = (markdown: string) => {
    setMarkdown(markdown);
    localStorage.setItem("MARKDOWN", markdown);
  }

  const togglePreview = () => {
    setIsPreviewFull(!isPreviewFull)
  }

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar)
  }

  const fetchData = async() => {
    try {
      const res = await fetch(`/api/files/${fileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json()
      if (data.error) {
        console.log(data.error)
        return;
      }
      setFileName(data.title)
      setMarkdown(data.text)
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    if (username && fileId){
      fetchData();
    }
  }, [username, fileId]);

  return (
    <main className="w-full bg-zinc-900 text-gray-300">
      {/* Navbar at the top */}
      <div className={`w-full transition-all duration-300 ${isSidebar ? 'ml-[250px]' : ''}`}>
        <Navbar isSidebar={isSidebar} toggleSidebar={toggleSidebar} username={username as string} fileId={fileId as string} fileName={fileName} setFileName={setFileName} currentMarkdown={markdown} setFiles={setFiles} fetchData={fetchData} />
      </div>
      {/* Sidebar shifts all elems on open */}
      <Sidebar $isSidebar={isSidebar} toggleSidebar={toggleSidebar} user={user} files={files} setFiles={setFiles} />
      {files.length == 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <EmptyPage user={user} setFiles={setFiles}/>
        </div>
      ) : (
      <div className={`grid ${isPreviewFull ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} transition-all duration-300 ${isSidebar ? 'ml-[250px]' : ''}`} style={{ maxHeight: 'calc(100vh - 3.5rem)' }}>
        <Editor markdown={markdown} setMarkdown={callback} isPreviewFull={isPreviewFull} />
        <Preview markdown={markdown} isPreviewFull={isPreviewFull} togglePreview={togglePreview} />
      </div>
      )}
    </main>
  );
}

export default File
