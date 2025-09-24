import { RichTextRenderer } from "./rich-text-renderer";
import { type RichTextDocument } from "@/interfaces/rich-text";

type Props = {
  content: string;
  richContent?: RichTextDocument;
};

export function PostBody({ content, richContent }: Props) {
  // If rich content exists, use the rich text renderer
  if (richContent) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <RichTextRenderer content={richContent} />
        </div>
      </div>
    );
  }

  // Fallback to markdown content
  return (
    <div className="max-w-4xl mx-auto px-6 py-4">
      <div 
        className="prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}