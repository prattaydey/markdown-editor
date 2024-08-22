interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    isPreviewFull: boolean;
}

export default function Editor({ markdown, setMarkdown, isPreviewFull }: EditorProps) {
    if (isPreviewFull){
        return null;
    }
    return (
    <div className="border-r border-zinc-600 flex flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
        <div className="w-full bg-zinc-800 p-2 text-gray-400 uppercase tracking-wider">
            <div className="ml-4"> Markdown </div>
        </div>
        <textarea
            className="w-full flex-grow bg-zinc-900 outline-none p-6 overflow-y-auto"
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
        />   
    </div>
    );
}