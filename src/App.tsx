import { useEffect, useState } from "react"
import Editor from "./components/Editor"
import Preview from "./components/Preview"
import Navbar from "./components/Navbar";

function App() {
  const storedMarkdown = localStorage.getItem("MARKDOWN");
  console.log(storedMarkdown)
  const [markdown, setMarkdown] = useState(storedMarkdown ? storedMarkdown : '');

  useEffect(() => {
    if (!storedMarkdown) {
      fetch('/defaulttext.txt')
        .then(response => response.text())
        .then(text => setMarkdown(text));
    }
  }, [storedMarkdown]);

  const callback = (markdown: string) => {
    setMarkdown(markdown);
    localStorage.setItem("MARKDOWN", markdown);
  }
  return (
    <main className="w-full bg-zinc-900 text-gray-300">
      <Navbar />
      <div className = "h-screen grid grid-cols-1 sm:grid-cols-2">
      <Editor markdown={markdown} setMarkdown={callback}/>
      <Preview markdown={markdown} />
      </div>
    </main>
  )
}

export default App
