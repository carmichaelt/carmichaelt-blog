import { stepCountIs, tool } from 'ai';
import { z } from 'zod';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const toolInputSchema = z.object({
  query: z.string().describe('The query to search the web for'),
  context: z.string().optional().describe('The context to search the web for'),
});

// Web search for items tool
export const webSearchTool = tool({
  description: 'Search the web for popular items in a specific category with optional price range',
  inputSchema: toolInputSchema,
  execute: async ({ query, context }) => {
    console.log('Executing web search for items tool', { query, context });
    try {
      const searchQuery = `${query} ${context ? ` ${context}` : ''}`;
      
      const result = await generateText({
        model: 'openai/gpt-4o',
        system: `You are a research assistant helping to gather information for blog content creation. Your goal is to search the web and compile relevant, accurate, and up-to-date information based on the provided query and context.

Guidelines:
1. Search for current, authoritative sources
2. Gather comprehensive information relevant to the topic
3. Focus on facts, statistics, and expert opinions
4. Organize findings in a clear, structured manner
5. Cite sources when possible
6. Provide context and background information that will be useful for blog writing`,
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