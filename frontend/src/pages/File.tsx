import { useEffect, useState } from "react"
import Editor from "../components/Editor";
import Preview from "../components/Preview"
import Navbar from "../components/Navbar";

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

  return (
    <main className="w-full bg-zinc-900 text-gray-300">
      <Navbar isSidebar={isSidebar} toggleSidebar={toggleSidebar} />
      <div className={`h-screen grid ${isPreviewFull ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      <Editor markdown={markdown} setMarkdown={callback} isPreviewFull={isPreviewFull} />
      <Preview markdown={markdown} isPreviewFull={isPreviewFull} togglePreview={togglePreview} />
      </div>
    </main>
  )
}

export default File
