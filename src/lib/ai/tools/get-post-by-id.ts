import { tool } from "ai";
import z from "zod";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export const getPostByIdTool = tool({
  name: 'get_post_by_id',
  description: 'Get a blog post by its ID. Use this when you need to access the current post being edited to understand its context, content, and structure.',
  inputSchema: z.object({
    postId: z.string().describe('The ID of the post to retrieve'),
  }),
  execute: async ({ postId }) => {
    try {
      // Note: fetchQuery works here because tools execute in the Next.js API route context
      const post = await fetchQuery(api.posts.getPostById, {
        postId: postId as any, // Convex Id types are strings at runtime
      });

      if (!post) {
        return {
          success: false,
          error: 'Post not found',
        };
      }

      // Extract text content from richContent if available
      let contentText = '';
      if (post.richContent) {
        // Simple extraction - convert rich text to plain text
        const extractText = (node: any): string => {
          if (typeof node === 'string') return node;
          if (node.type === 'text') return node.text || '';
          if (node.content && Array.isArray(node.content)) {
            return node.content.map(extractText).join(' ');
          }
          return '';
        };
        contentText = extractText(post.richContent);
      } else if (post.content) {
        try {
          const parsed = JSON.parse(post.content);
          if (typeof parsed === 'object') {
            const extractText = (node: any): string => {
              if (typeof node === 'string') return node;
              if (node.type === 'text') return node.text || '';
              if (node.content && Array.isArray(node.content)) {
                return node.content.map(extractText).join(' ');
              }
              return '';
            };
            contentText = extractText(parsed);
          } else {
            contentText = post.content;
          }
        } catch {
          contentText = post.content;
        }
      }

      return {
        success: true,
        data: {
          id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: contentText.substring(0, 5000), // Limit to first 5000 chars for context
          fullContent: contentText.length > 5000,
          coverImage: post.coverImage,
          ogImage: post.ogImage,
          date: post.date,
          tags: post.tags || [],
          preview: post.preview || false,
        },
      };
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch post',
      };
    }
  },
});

