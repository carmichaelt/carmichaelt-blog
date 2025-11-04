"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Send, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { DefaultChatTransport } from "ai";

interface StructuredBlogData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
}

interface AIChatPanelProps {
  onCopyToEditor?: (content: string) => void;
  onStructuredData?: (data: StructuredBlogData) => void;
  postId?: string;
}

export function AIChatPanel({ onCopyToEditor, onStructuredData, postId }: AIChatPanelProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent/chat',
      body: {
        postId,
      },
    }),
  });

  const handleCopyMessage = (content: string) => {
    if (onCopyToEditor) {
      onCopyToEditor(content);
      toast.success("Content copied to editor!");
    } else {
      navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard!");
    }
  };

  const handleCopyStructuredData = (data: StructuredBlogData) => {
    if (onStructuredData) {
      onStructuredData(data);
      toast.success("Blog post data loaded into form!");
    } else {
      // Fallback: copy as JSON
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      toast.success("Data copied to clipboard!");
    }
  };

  // Extract structured data from tool results
  const extractStructuredData = (message: any): StructuredBlogData | null => {
    if (!Array.isArray(message.parts)) return null;
    
    for (const part of message.parts) {
      // Check for tool-result parts
      if (part.type === "tool-result") {
        const result = part.result;
        if (!result) continue;
        
        // Check if result has structured data in result.data
        if (result.data && typeof result.data === "object") {
          const data = result.data;
          if (data.title || data.slug || data.excerpt || data.content) {
            return {
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt,
              content: data.content,
            };
          }
        }
        
        // Also check if result itself has the structure (for backward compatibility)
        if (result.title || result.slug || result.excerpt || result.content) {
          return {
            title: result.title,
            slug: result.slug,
            excerpt: result.excerpt,
            content: result.content,
          };
        }
      }
      
      // Also check tool-call parts that might have results embedded
      if (part.type === "tool-call" && part.result) {
        const result = part.result;
        if (result.data && typeof result.data === "object") {
          const data = result.data;
          if (data.title || data.slug || data.excerpt || data.content) {
            return {
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt,
              content: data.content,
            };
          }
        }
      }
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI Writing Assistant</CardTitle>
        <p className="text-sm text-muted-foreground">
          Chat with AI to get content suggestions for your blog post
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>Start a conversation to get AI-powered content suggestions</p>
              </div>
            )}
            {messages.map((message) => {
              // Handle agent message parts structure
              let messageContent = "";
              const msg = message as any;
              const structuredData = message.role === "assistant" ? extractStructuredData(msg) : null;
              
              if (message.role === "user") {
                // User messages can have parts array or direct content/text
                if (Array.isArray(msg.parts)) {
                  const textParts = msg.parts
                    .filter((part: any) => part.type === "text")
                    .map((part: any) => part.text || part.content || "")
                    .filter(Boolean);
                  messageContent = textParts.join("\n\n");
                } else if (typeof msg.content === "string") {
                  messageContent = msg.content;
                } else if (typeof msg.text === "string") {
                  messageContent = msg.text;
                } else if (msg.content?.text) {
                  messageContent = msg.content.text;
                }
              } else if (message.role === "assistant") {
                // Agent messages use parts array
                if (Array.isArray(msg.parts)) {
                  const textParts = msg.parts
                    .filter((part: any) => part.type === "text")
                    .map((part: any) => part.text || part.content || "")
                    .filter(Boolean);
                  messageContent = textParts.join("\n\n");
                } else if (typeof msg.content === "string") {
                  messageContent = msg.content;
                } else if (typeof msg.content === "object" && msg.content?.text) {
                  messageContent = msg.content.text;
                } else if (typeof msg.text === "string") {
                  messageContent = msg.text;
                }
              }

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col gap-2",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  {/* User message */}
                  {message.role === "user" && messageContent && (
                    <div className="rounded-lg px-4 py-2 max-w-[80%] bg-primary text-primary-foreground">
                      <div className="whitespace-pre-wrap text-sm">
                        {messageContent}
                      </div>
                    </div>
                  )}

                  {/* Assistant message with structured data */}
                  {message.role === "assistant" && structuredData && (
                    <Card className="w-full max-w-[90%] border-2 border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Generated Blog Post
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {structuredData.title && (
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground mb-1">Title</div>
                            <div className="text-sm">{structuredData.title}</div>
                          </div>
                        )}
                        {structuredData.slug && (
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground mb-1">Slug</div>
                            <div className="text-sm font-mono text-muted-foreground">{structuredData.slug}</div>
                          </div>
                        )}
                        {structuredData.excerpt && (
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground mb-1">Excerpt</div>
                            <div className="text-sm">{structuredData.excerpt}</div>
                          </div>
                        )}
                        {structuredData.content && (
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground mb-1">Content</div>
                            <div className="text-sm whitespace-pre-wrap max-h-40 overflow-y-auto bg-muted/50 p-2 rounded">
                              {structuredData.content.substring(0, 500)}
                              {structuredData.content.length > 500 && "..."}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleCopyStructuredData(structuredData)}
                            className="flex-1"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Copy All to Form
                          </Button>
                          {structuredData.content && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyMessage(structuredData.content!)}
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Content Only
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Assistant message without structured data */}
                  {message.role === "assistant" && !structuredData && messageContent && (
                    <>
                      <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
                        <div className="whitespace-pre-wrap text-sm">
                          {messageContent}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyMessage(messageContent)}
                        className="h-7 text-xs"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy to Editor
                      </Button>
                    </>
                  )}
                </div>
              );
            })}
            {status === "streaming" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={e => { e.preventDefault(); 
          if (input.trim()) {
            sendMessage({text: input });
            setInput("");
          }
        }} className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask for content suggestions..."
            className="flex-1"
            disabled={status !== "ready"}
          />
          <Button type="submit" disabled={status !== "ready" || !input.trim()}>
              <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

