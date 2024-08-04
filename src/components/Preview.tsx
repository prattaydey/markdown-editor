import { useEffect, useState } from "react";
import { Marked } from "marked";
import dompurify from "dompurify";
import hljs from "highlight.js";
import 'highlight.js/styles/tokyo-night-dark.css';
import { markedHighlight } from "marked-highlight";

interface PreviewProps {
    markdown: string;
}

const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

export default function Preview({ markdown } : PreviewProps){
    // to avoid returning Promise<string>
    const parseMarkdown = async (markdown: string) => {
        const parsed = await marked.parse(markdown);
        return dompurify.sanitize(parsed);
    };
    
    const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

    // parses and sanitizes everytime markdown is updated
    useEffect(() => {
        parseMarkdown(markdown).then(setSanitizedHtml);
    }, [markdown]);

    return (
    <div className="w-full h-full bg-zinc-900">
        <div className="w-full bg-zinc-800 p-3 text-gray-400 uppercase tracking-wider">Preview</div>
        <div className="prose prose-invert p-6" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
    )
}
