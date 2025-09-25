import { Id } from "../../convex/_generated/dataModel";
import { type RichTextDocument } from "./rich-text";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Id<"users">;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  richContent?: RichTextDocument; // Rich text content as JSON
  preview?: boolean;
};