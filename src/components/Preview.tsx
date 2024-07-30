import { marked } from "marked";
import dompurify from "dompurify";

interface PreviewProps {
    markdown: string;
}

export default function Preview({ markdown } : PreviewProps){
    const parsed = dompurify.sanitize(marked.parse(markdown));
    return (
    <div className="bg-zinc-900">
        <div className="w-full bg-zinc-800 p-3 text-gray-400 uppercase tracking-wider">Preview</div>
        <div className="prose prose-invert p-6" dangerouslySetInnerHTML={{ __html: parsed }} />
    </div>
    )
}
