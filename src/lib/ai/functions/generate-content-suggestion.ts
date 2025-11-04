import { auth } from "@clerk/nextjs/server";
import { streamText, UIMessage, convertToModelMessages, generateObject, streamObject } from "ai";
import z from "zod";



export async function streamContentSuggestion(messages: UIMessage[]) {

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized: User not authenticated");
    }

    const objectSchema = z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string(),
        content: z.string(),
    });

        /* Build context
        const contextInfo = `
        Previous Blog Posts: ${dbUser.blogPosts.map((post) => post.title).join(", ")}
        Projects: ${dbUser.projects.map((project) => project.title).join(", ")}`
        */
    // Construct the full prompt
    const systemPrompt = `You are a blog writing expert and creative content suggestion assistant. Your goal is to suggest personalized, practical, and creative content suggestions based on the provided context and user input.

        Guidelines:
        1. Consider the user's previous blog posts and projects
        2. Avoid suggesting content that is very similar to previous posts
        3. Be creative but also practical
        4. Generate 1 diverse content suggestion
        5. Keep the content suggestion concise (50-1000 words)
        6. Ensure the content suggestion is helpful and explains the topic`;


    const textStream = await generateObject({
        model: 'openai/gpt-4o',
        system: systemPrompt,
        schema: objectSchema,
        messages: convertToModelMessages(messages),
        temperature: 0.7,
    });

    return textStream
}