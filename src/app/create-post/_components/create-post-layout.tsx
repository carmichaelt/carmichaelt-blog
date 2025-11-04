"use client";

import { useRef, useState } from "react";
import { CreatePostForm } from "./create-post-form";
import { AIChatPanel } from "./ai-chat-panel";
import { type MarkdownEditorRef } from "./markdown-editor";
import { type Doc } from "../../../../convex/_generated/dataModel";

interface CreatePostLayoutProps {
  authorId: string;
  post?: Doc<"posts"> | null;
  mode?: "create" | "edit";
}

interface StructuredBlogData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
}

export function CreatePostLayout({ authorId, post, mode = "create" }: CreatePostLayoutProps) {
  const editorRef = useRef<MarkdownEditorRef>(null);
  const [formData, setFormData] = useState<StructuredBlogData | null>(null);

  const handleInsertContent = (content: string) => {
    editorRef.current?.insertContent(content);
  };

  const handleStructuredData = (data: StructuredBlogData) => {
    setFormData(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
      {/* AI Chat Panel */}
      <div className="flex flex-col min-h-[600px] lg:min-h-[800px]">
        <AIChatPanel 
          onCopyToEditor={handleInsertContent}
          onStructuredData={handleStructuredData}
          postId={post?._id ? String(post._id) : undefined}
        />
      </div>

      {/* Blog Form */}
      <div className="flex flex-col min-h-[600px] lg:min-h-[800px]">
        <CreatePostForm 
          authorId={authorId} 
          editorRef={editorRef}
          initialData={formData}
          post={post}
          mode={mode}
        />
      </div>
    </div>
  );
}

