'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { type Id } from '../../../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/app/create-post/_components/rich-text-editor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, Save, AlertTriangle } from 'lucide-react';
import { type RichTextDocument } from '@/interfaces/rich-text';
import { logger } from '@/lib/logger';
import { Doc } from '../../../../../../convex/_generated/dataModel';
import { Alert, AlertDescription } from '@/components/ui/alert';

const editPostSchema = z.object({
  postId: z.string(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt must be less than 300 characters'),
  ogImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  preview: z.boolean(),
  content: z.string(),
  richContent: z.any().optional(),
  tags: z.array(z.string()).optional(),
});


type EditPostFormData = z.infer<typeof editPostSchema>;

interface EditPostFormProps {
  post: Doc<"posts">;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [richContent, setRichContent] = useState<RichTextDocument | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();
  const updatePost = useMutation(api.posts.updatePost);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      ogImage: post.ogImage || '',
      coverImage: post.coverImage || '',
      preview: post.preview || false,
      content: post.content,
      richContent: post.richContent,
      tags: post.tags || [],
      postId: post._id as Id<"posts">,
    },
  });

  // Watch for form changes
  const watchedValues = watch();

  // Initialize rich content from existing post
  useEffect(() => {
    if (post.richContent) {
      setRichContent(post.richContent);
    } else if (post.content) {
      try {
        const parsedContent = JSON.parse(post.content);
        setRichContent(parsedContent);
      } catch {
        // If parsing fails, create a basic rich text document
        setRichContent({
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: post.content,
                },
              ],
            },
          ],
        });
      }
    }
  }, [post.richContent, post.content]);

  // Track unsaved changes
  useEffect(() => {
    const hasChanges = isDirty || (richContent && JSON.stringify(richContent) !== JSON.stringify(post.richContent));
    setHasUnsavedChanges(!!hasChanges);
  }, [isDirty, richContent, post.richContent]);

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (data: EditPostFormData) => {
    if (!richContent) {
      toast.error('Please add some content to your post');
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        ...data,
        content: JSON.stringify(richContent), // Fallback for backward compatibility
        coverImage: data.coverImage || 'https://picsum.photos/200/300',
        ogImage: data.ogImage || 'https://picsum.photos/200/300',
        postId: post._id as Id<"posts">,
      };

      // Optimistic update - show success immediately
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      await updatePost(postData);
      
      toast.success('Post updated successfully!');
      
      // Navigate to the updated post
      router.push(`/posts/${data.slug}`);
    } catch (error) {
      // Revert optimistic update on error
      setHasUnsavedChanges(true);
      
      logger.error('Error updating post', error as Error, { 
        postId: post._id,
        postData: { title: data.title, slug: data.slug }
      });
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update post. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-save functionality (optional)
  const handleAutoSave = useCallback(async () => {
    if (!richContent || isSubmitting) return;
    
    try {
      const currentValues = watchedValues;
      const postData = {
        ...currentValues,
        content: JSON.stringify(richContent),
        coverImage: currentValues.coverImage || 'https://picsum.photos/200/300',
        ogImage: currentValues.ogImage || 'https://picsum.photos/200/300',
        postId: post._id as Id<"posts">,
      };

      await updatePost(postData);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [richContent, watchedValues, isSubmitting, updatePost, post._id]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Post</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {lastSaved && (
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            )}
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-1 text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span>Unsaved changes</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter post title"
              onChange={(e) => {
                const title = e.target.value;
                const slug = generateSlug(title);
                setValue('slug', slug);
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
              {...register('slug')}
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
              {...register('excerpt')}
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
                {...register('coverImage')}
                placeholder="https://example.com/image.jpg"
              />
              {errors.coverImage && (
                <p className="text-sm text-red-600">{errors.coverImage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                {...register('ogImage')}
                placeholder="https://example.com/og-image.jpg"
              />
              {errors.ogImage && (
                <p className="text-sm text-red-600">{errors.ogImage.message}</p>
              )}
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="preview"
              {...register('preview')}
            />
            <Label htmlFor="preview">Save as draft (preview)</Label>
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor
              content={richContent || undefined}
              onChange={setRichContent}
              placeholder="Start writing your post content..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {hasUnsavedChanges && (
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You have unsaved changes. Don't forget to save your work!
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !hasUnsavedChanges}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}