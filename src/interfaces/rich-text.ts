// TipTap JSON content type
export interface RichTextContent {
  type: string;
  content?: RichTextContent[];
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
  }>;
}

export type RichTextDocument = RichTextContent;
