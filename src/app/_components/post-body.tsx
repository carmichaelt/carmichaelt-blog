"use client";

import { useState, useEffect } from "react";
import markdownToHtml from "@/lib/markdownToHtml";
import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function convertMarkdown() {
      if (!content) {
        setHtmlContent("");
        setIsLoading(false);
        return;
      }

      try {
        // Check if content is already HTML (for backward compatibility)
        // Simple heuristic: if it starts with < and ends with >, it might be HTML
        if (content.trim().startsWith("<") && content.trim().endsWith(">")) {
          // It's likely HTML, use it directly
          setHtmlContent(content);
        } else {
          // Convert markdown to HTML
          const html = await markdownToHtml(content);
          setHtmlContent(html);
        }
      } catch (error) {
        console.error("Error converting markdown to HTML:", error);
        // Fallback to displaying raw content
        setHtmlContent(content);
      } finally {
        setIsLoading(false);
      }
    }

    convertMarkdown();
  }, [content]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/*<div
        className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      */}
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
