interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
}

export default function Editor({ markdown, setMarkdown }: EditorProps) {
    return (
    <div className="border-r border-zinc-600">
        <div className="w-full bg-zinc-800 p-3 text-gray-400 uppercase tracking-wider">Markdown</div>
        <textarea
            className="w-full h-full bg-zinc-900 outline-none p-6"
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
        />   
    </div>
    );
}