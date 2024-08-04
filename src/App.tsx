import { useState } from "react"
import Editor from "./components/Editor"
import Preview from "./components/Preview"

function App() {
  const storedMarkdown = localStorage.getItem("MARKDOWN");

  const [markdown, setMarkdown] = useState(storedMarkdown ? storedMarkdown : '# Markdown Editor');

  const callback = (markdown: string) => {
    setMarkdown(markdown);
    localStorage.setItem("MAKRDOWN", markdown);
  }
  
  return (
    <main className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 bg-zinc-900 text-gray-300">
      <Editor markdown={markdown} setMarkdown={callback}/>
      <Preview markdown={markdown} />
    </main>
  )
}

export default App
