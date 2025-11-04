import { stepCountIs, tool } from 'ai';
import { z } from 'zod';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const toolInputSchema = z.object({
  query: z.string().describe('The query to search the web for'),
  context: z.string().optional().describe('The context to search the web for'),
});

// Web search for items tool
export const webSearchBlogImgUrlTool = tool({
  description: 'Search the web for an image for the blog post and return its URL based on the provided query and context',
  inputSchema: toolInputSchema,
  execute: async ({ query, context }) => {
    try {
      const searchQuery = `${query} ${context ? ` ${context}` : ''}`;
      
      const result = await generateText({
        model: 'openai/gpt-4o',
        system: `You are an image searching tool. Your goal is to search the web and find an image for the blog post and return its URL based on the provided query and context.

Guidelines:
1. Try to find a logo for a key part of the blog post tech stack or topic or product.
2. Return the URL of the image
3. The image should be relevant to the topic of the blog post
4. The image should be high quality
5. The image should be free to use`,
        prompt: `Search the web for relevant information based on the following query and context:

Query: ${query}
${context ? `Context: ${context}` : ''}

Provide a comprehensive summary of the search results that will be useful for creating blog content.`,
        tools: {
          web_search: openai.tools.webSearch({
            searchContextSize: 'high',
          }),
        },
        stopWhen: stepCountIs(3),
      });

      return {
        success: true,
        data: {
          query: searchQuery,
          results: result.text,
          usage: result.usage,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search the web',
      };
    }
  },
});