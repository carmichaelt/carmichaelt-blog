import { generateText, tool } from "ai";
import z from "zod";

export const generateBlogContentTool = tool({
    description: 'Generate a complete blog post with title, slug, excerpt, and content based on the provided context and user input.',
    inputSchema: z.object({
        context: z.string().describe('The context to generate a blog post for'),
        userInput: z.string().describe('The user input to generate a blog post for'),
    }),
    execute: async (args) => {
      const result = await generateText({
        model: 'openai/gpt-4o',
        system: `You are a blog writing expert and creative content generator. Your goal is to generate a comprehensive, well-structured blog post based on the provided context and user input.

IMPORTANT: You MUST return a valid JSON object with the following structure:
{
  "title": "A compelling and engaging blog post title (max 100 characters)",
  "slug": "url-friendly-slug-using-lowercase-and-hyphens",
  "excerpt": "A brief, engaging summary of the post (max 300 characters)",
  "content": "The full blog post content in markdown format with proper headings, paragraphs, and formatting (500-2000 words recommended)"
}

Guidelines:
1. Create engaging, informative content that provides value to readers
2. Use proper blog post structure with clear headings and sections
3. Write in a professional yet approachable tone
4. Include relevant details and examples when appropriate
5. Ensure the content is well-organized and easy to read
6. The slug should be URL-friendly (lowercase, hyphens, no special characters)
7. The excerpt should be compelling and summarize the key points
8. Return ONLY valid JSON, no additional text before or after`,
        prompt: `Context: ${args.context}
User Input: ${args.userInput}

Generate a complete blog post with title, slug, excerpt, and content. Return ONLY a valid JSON object matching the required structure.`,
        temperature: 0.7,
      });
      
      // Try to parse the JSON from the response
      let parsedContent;
      try {
        // Extract JSON from the response (handle cases where it's wrapped in markdown code blocks)
        const jsonMatch = result.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedContent = JSON.parse(jsonMatch[0]);
        } else {
          parsedContent = JSON.parse(result.text);
        }
      } catch (error) {
        // If parsing fails, return the raw text but wrap it in a structure
        console.error('Failed to parse structured content:', error);
        parsedContent = {
          title: 'Generated Blog Post',
          slug: 'generated-blog-post',
          excerpt: result.text.substring(0, 300),
          content: result.text,
        };
      }
      
      return {
        success: true,
        data: parsedContent,
        usage: result.usage,
      };
    },
  });