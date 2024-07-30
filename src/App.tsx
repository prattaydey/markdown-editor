import { useState } from "react"
import Editor from "./components/Editor"
import Preview from "./components/Preview"

function App() {
  const [markdown, setMarkdown] = useState('# Markdown Editor');
  return (
    <main className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 bg-zinc-900 text-gray-300">
      <Editor markdown={markdown} setMarkdown={setMarkdown}/>
      <Preview markdown={markdown} />
    </main>
  )
}

export default App
