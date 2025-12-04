import { generateText, tool } from "ai";
import { z } from "zod";

export const generateBlogIdeaTool = tool({
    description: 'Suggest personalized, practical, and creative content suggestions based on the provided context and user input.',
    inputSchema: z.object({
        context: z.string().describe('The context to generate a blog post idea for'),
        userInput: z.string().describe('The user input to generate a blog post idea for'),
    }),
    execute: async (input) => {
      const result = await generateText({
        model: 'openai/gpt-4o',
        system: `You are a blog writing expert and creative content suggestion assistant. Your goal is to suggest personalized, practical, and creative blog post ideas based on the provided context and user input.

Guidelines:
1. Suggest unique and engaging blog post ideas that stand out
2. Consider the user's context and previous work to avoid repetition
3. Provide practical, actionable ideas that readers will find valuable
4. Be creative but ensure ideas are feasible and relevant
5. Include a brief explanation of why each idea would be effective
6. Suggest 1-3 diverse ideas that explore different angles of the topic`,
        prompt: `Context: ${input.context}
User Input: ${input.userInput}

Generate creative blog post ideas based on the above context and user input.`,
        temperature: 0.7,
      });
      return {
        text: result.text,
        usage: result.usage,
      };
    },
  });