'use client';

import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { type RichTextDocument } from '@/interfaces/rich-text';

interface RichTextRendererProps {
  content: RichTextDocument;
  className?: string;
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content) {
    return null;
  }

  const html = generateHTML(content, [
    StarterKit,
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg',
      },
    }),
    Link.configure({
      HTMLAttributes: {
        class: 'text-blue-600 underline',
      },
    }),
  ]);

  return (
    <div 
      className={`prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto max-w-none ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
