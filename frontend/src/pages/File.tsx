import { useEffect, useState } from "react"
import Editor from "../components/Editor";
import Preview from "../components/Preview"
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Document } from "../types";

function File() {
  const storedMarkdown = localStorage.getItem("MARKDOWN");
  const [markdown, setMarkdown] = useState(storedMarkdown ? storedMarkdown : '');
  const [isPreviewFull, setIsPreviewFull] = useState<boolean>(false);
  const [isSidebar, setIsSidebar] = useState<boolean>(false)

  useEffect(() => {
    if (!storedMarkdown) {
      fetch('/defaulttext.txt')
        .then(response => response.text())
        .then(text => {
          setMarkdown(text);
          localStorage.setItem("MARKDOWN", text);
        });
    } else {
      setMarkdown(storedMarkdown);
    }
  }, [storedMarkdown]);

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

  const documents: Document[] = [
    { id: 1, name: "Document 1", createdAt: "2024-08-10" },
    { id: 2, name: "Document 2", createdAt: "2024-08-09" },
    // Add more mock documents as needed
  ];

  return (
    <main className="w-full bg-zinc-900 text-gray-300">
      {/* Navbar at the top */}
      <div className={`w-full transition-all duration-300 ${isSidebar ? 'ml-[250px]' : ''}`}>
        <Navbar isSidebar={isSidebar} toggleSidebar={toggleSidebar} />
      </div>
      {/* Sidebar shifts all elems on open */}
      <Sidebar $isSidebar={isSidebar} toggleSidebar={toggleSidebar} documents={documents} />
      {/* Editor and Preview */}
      <div className={`grid ${isPreviewFull ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} transition-all duration-300 ${isSidebar ? 'ml-[250px]' : ''}`} style={{ maxHeight: 'calc(100vh - 3.5rem)' }}>
        <Editor markdown={markdown} setMarkdown={callback} isPreviewFull={isPreviewFull} />
        <Preview markdown={markdown} isPreviewFull={isPreviewFull} togglePreview={togglePreview} />
      </div>
    </main>
  )
}

export default File
