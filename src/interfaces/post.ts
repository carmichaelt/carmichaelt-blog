import { type Author } from "./author";
import { type RichTextDocument } from "./rich-text";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  richContent?: RichTextDocument; // Rich text content as JSON
  preview?: boolean;
};