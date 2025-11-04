"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export interface MarkdownEditorRef {
  insertContent: (content: string) => void;
}

export const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(
  function MarkdownEditor(
    {
      content = "",
      onChange,
      placeholder = "Start writing your post in Markdown...",
      className,
    },
    ref
  ) {
    const [markdown, setMarkdown] = useState(content);

    // Update internal state when content prop changes
    useEffect(() => {
      setMarkdown(content);
    }, [content]);

    const handleChange = (value: string) => {
      setMarkdown(value);
      onChange?.(value);
    };

    useImperativeHandle(ref, () => ({
      insertContent: (newContent: string) => {
        const textarea = document.querySelector(
          'textarea[data-markdown-editor]'
        ) as HTMLTextAreaElement;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = markdown;
          const newText = text.substring(0, start) + newContent + text.substring(end);
          handleChange(newText);
          // Focus and set cursor position after insertion
          setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + newContent.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
          }, 0);
        }
      },
    }));

    return (
      <div className={cn("space-y-2", className)}>
        <Textarea
          data-markdown-editor
          value={markdown}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[400px] font-mono text-sm resize-y"
        />
        <p className="text-xs text-muted-foreground">
          Markdown supported. Use **bold**, *italic*, `code`, and more.
        </p>
      </div>
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";

