"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { type Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MarkdownEditor, type MarkdownEditorRef } from "./markdown-editor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Save, AlertCircle } from "lucide-react";
import { type Doc } from "../../../../convex/_generated/dataModel";

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(300, "Excerpt must be less than 300 characters"),
  ogImage: z.union([z.string().url("Must be a valid URL"), z.literal("")]).optional(),
  coverImage: z.union([z.string().url("Must be a valid URL"), z.literal("")]).optional(),
  preview: z.boolean(),
  authorId: z.string(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
  views: z.number().optional(),
  updatedAt: z.string().optional(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

interface StructuredBlogData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
}

interface CreatePostFormProps {
  authorId: string;
  editorRef?: React.RefObject<MarkdownEditorRef | null>;
  initialData?: StructuredBlogData | null;
  post?: Doc<"posts"> | null;
  mode?: "create" | "edit";
}

export function CreatePostForm({ 
  authorId, 
  editorRef: externalEditorRef, 
  initialData,
  post,
  mode = "create",
}: CreatePostFormProps) {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const createPost = useMutation(api.posts.createPost);
  const updatePost = useMutation(api.posts.updatePost);
  const internalEditorRef = useRef<MarkdownEditorRef>(null);
  const editorRef = externalEditorRef || internalEditorRef;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      preview: post?.preview ?? false,
      ogImage: post?.ogImage || "",
      coverImage: post?.coverImage || "",
      authorId: authorId as Id<"users">,
      content: post?.content || "",
    },
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Initialize markdown content from existing post
  useEffect(() => {
    if (post && mode === "edit") {
      // Use content directly as markdown
      if (post.content) {
        // If content is JSON (legacy richContent), try to extract text
        try {
          const parsed = JSON.parse(post.content);
          // If it's a TipTap document, try to extract text
          if (parsed.type === "doc" && parsed.content) {
            // For now, just use the raw content or try to extract text
            // In a real scenario, you might want to convert TipTap to markdown
            setMarkdownContent(post.content);
          } else {
            setMarkdownContent(post.content);
          }
        } catch {
          // If it's not JSON, treat it as markdown/HTML
          // If it's HTML, we'll need to convert it, but for now just use it
          setMarkdownContent(post.content);
        }
      }
    }
  }, [post, mode]);

  // Populate form when initialData changes
  useEffect(() => {
    if (initialData) {
      if (initialData.title) {
        setValue("title", initialData.title);
      }
      if (initialData.slug) {
        setValue("slug", initialData.slug);
      } else if (initialData.title) {
        // Auto-generate slug if not provided
        setValue("slug", generateSlug(initialData.title));
      }
      if (initialData.excerpt) {
        setValue("excerpt", initialData.excerpt);
      }
      if (initialData.content) {
        // Set markdown content
        setMarkdownContent(initialData.content);
        setValue("content", initialData.content);
      }
      toast.success("Blog post data loaded into form!");
    }
  }, [initialData, setValue, editorRef]);

  const onSubmit = async (data: CreatePostFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", errors);
    
    if (!markdownContent || markdownContent.trim().length === 0) {
      console.error("No markdown content provided");
      toast.error("Please add some content to your post");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "edit" && post) {
        console.log("Updating post", { postId: post._id, markdownContent });
        const postData = {
          postId: post._id as Id<"posts">,
          ...data,
          content: markdownContent,
          ogImage: data.ogImage || "",
          coverImage: data.coverImage || "",
        };

        console.log("Post data to update:", postData);
        await updatePost({
          ...postData,
          authorId: postData.authorId as Id<"users">,
        });
        toast.success("Post updated successfully!");
        router.push(`/posts/${data.slug}`);
      } else {
        const postData = {
          ...data,
          content: markdownContent,
          authorId: authorId as Id<"users">,
          date: new Date().toISOString(),
          ogImage: data.ogImage || "",
          coverImage: data.coverImage || "",
        };

        console.log("Post data to create:", postData);
        await createPost(postData);
        toast.success("Post created successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error(`Error ${mode === "edit" ? "updating" : "creating"} post:`, error);
      toast.error(`Failed to ${mode === "edit" ? "update" : "create"} post. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form validation errors
  const handleFormError = (errors: any) => {
    console.error("Form validation errors:", errors);
    const errorMessages = Object.keys(errors).map((key) => {
      const error = errors[key as keyof typeof errors];
      return `${key}: ${error?.message || "Invalid value"}`;
    });
    toast.error(`Form validation failed: ${errorMessages.join(", ")}`);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>{mode === "edit" ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit, handleFormError)} className="space-y-6">
          {/* General Form Errors */}
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the errors below before submitting.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter post title"
              onChange={(e) => {
                const title = e.target.value;
                const slug = generateSlug(title);
                setValue("slug", slug);
              }}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="post-url-slug"
            />
            {errors.slug && (
              <p className="text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              {...register("excerpt")}
              placeholder="Brief description of your post"
              rows={3}
            />
            {errors.excerpt && (
              <p className="text-sm text-red-600">{errors.excerpt.message}</p>
            )}
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                {...register("coverImage")}
                placeholder="https://example.com/image.jpg"
              />
              {errors.coverImage && (
                <p className="text-sm text-red-600">
                  {errors.coverImage.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                {...register("ogImage")}
                placeholder="https://example.com/og-image.jpg"
              />
              {errors.ogImage && (
                <p className="text-sm text-red-600">{errors.ogImage.message}</p>
              )}
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                name="preview"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="preview"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="preview">Save as draft (preview)</Label>
            </div>
            {errors.preview && (
              <p className="text-sm text-red-600">{errors.preview.message}</p>
            )}
          </div>

          {/* Markdown Editor */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <MarkdownEditor
              ref={editorRef}
              content={markdownContent}
              onChange={(value) => {
                setMarkdownContent(value);
                setValue("content", value);
              }}
              placeholder="Start writing your post in Markdown..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !markdownContent || markdownContent.trim().length === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "edit" ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {mode === "edit" && <Save className="mr-2 h-4 w-4" />}
                  {mode === "edit" ? "Update Post" : "Create Post"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
