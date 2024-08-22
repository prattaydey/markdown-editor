import { useEffect, useState } from "react";
import { Marked } from "marked";
import dompurify from "dompurify";
import hljs from "highlight.js";
import 'highlight.js/styles/tokyo-night-dark.css';
import { markedHighlight } from "marked-highlight";

interface PreviewProps {
    markdown: string;
    isPreviewFull: boolean;
    togglePreview: () => void;
}

const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

export default function Preview({ markdown, isPreviewFull, togglePreview } : PreviewProps){
    const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

    // to avoid returning Promise<string>
    const parseMarkdown = async (markdown: string) => {
        const parsed = await marked.parse(markdown);
        return dompurify.sanitize(parsed);
    };

    // parses and sanitizes everytime markdown is updated
    useEffect(() => {
        parseMarkdown(markdown).then(setSanitizedHtml);
    }, [markdown]);

    return (
      <div className="w-full h-full bg-zinc-900 flex flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
        <div className="w-full bg-zinc-800 p-2 text-gray-400 uppercase tracking-wider flex justify-between items-center">
          <div className="ml-4"> Preview </div>
          <img 
            src= {`/assets/${isPreviewFull? 'icon-hide-preview' : 'icon-show-preview'}.svg`}
            alt={isPreviewFull ? "Show Editor" : "Hide Editor"}
            className= "mr-3"
            onClick={togglePreview}
          />
          </div>
        <div className="prose prose-invert flex-grow overflow-y-auto" style={{ maxWidth: isPreviewFull ? 'none' : '100%', padding: '1.5rem' }} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
    )
}
