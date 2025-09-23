import markdownStyles from "@/app/_components/markdown-styles.module.css";
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
      <div className="max-w-2xl mx-auto">
        <RichTextRenderer content={richContent} />
      </div>
    );
  }

  // Fallback to markdown content
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}