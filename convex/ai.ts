"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

/**
 * Generate AI blog content suggestions based on a short prompt
 * This action uses OpenAI's GPT-4 to generate blog content
 */
export const generateBlogContent = action({
  args: {
    prompt: v.string(),
    tone: v.optional(v.union(
      v.literal("professional"),
      v.literal("casual"),
      v.literal("technical"),
      v.literal("conversational")
    )),
    length: v.optional(v.union(
      v.literal("short"),
      v.literal("medium"),
      v.literal("long")
    )),
  },
  handler: async (ctx, args) => {
    const { prompt, tone = "professional", length = "medium" } = args;

    // Validate API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }

    // Define length parameters
    const lengthInstructions = {
      short: "Write a concise blog post (2-3 paragraphs, around 300 words).",
      medium: "Write a detailed blog post (4-6 paragraphs, around 600-800 words).",
      long: "Write a comprehensive blog post (8-10 paragraphs, around 1200-1500 words).",
    };

    // Define tone instructions
    const toneInstructions = {
      professional: "Use a professional, formal tone suitable for business or academic audiences.",
      casual: "Use a casual, friendly tone as if talking to a friend.",
      technical: "Use a technical, precise tone with industry-specific terminology.",
      conversational: "Use a conversational, engaging tone that connects with readers.",
    };

    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: `You are an expert blog content writer. ${toneInstructions[tone]} ${lengthInstructions[length]} 
        
Format the content with proper HTML structure using:
- <h2> and <h3> tags for headings
- <p> tags for paragraphs
- <strong> and <em> tags for emphasis
- <ul> and <li> tags for bullet points
- <ol> and <li> tags for numbered lists
- <blockquote> tags for quotes

Make the content engaging, well-structured, and ready to publish.`,
        prompt: `Write a blog post about: ${prompt}`,
        temperature: 0.7,
      });

      return {
        content: text,
        prompt,
        tone,
        length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error generating blog content:", error);
      throw new Error(
        error instanceof Error
          ? `Failed to generate content: ${error.message}`
          : "Failed to generate content"
      );
    }
  },
});

/**
 * Expand or improve existing content
 */
export const improveContent = action({
  args: {
    content: v.string(),
    instruction: v.string(),
  },
  handler: async (ctx, args) => {
    const { content, instruction } = args;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }

    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: `You are an expert content editor. Improve the given content according to the user's instructions. 
        
Maintain the existing HTML formatting and structure. Use:
- <h2> and <h3> tags for headings
- <p> tags for paragraphs
- <strong> and <em> tags for emphasis
- <ul> and <li> tags for bullet points
- <ol> and <li> tags for numbered lists
- <blockquote> tags for quotes`,
        prompt: `Content to improve:
${content}

Instruction: ${instruction}

Please provide the improved version:`,
        temperature: 0.7,
      });

      return {
        improvedContent: text,
        originalContent: content,
        instruction,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error improving content:", error);
      throw new Error(
        error instanceof Error
          ? `Failed to improve content: ${error.message}`
          : "Failed to improve content"
      );
    }
  },
});

/**
 * Generate blog post title suggestions
 */
export const generateTitleSuggestions = action({
  args: {
    topic: v.string(),
    count: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { topic, count = 5 } = args;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }

    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: `You are an expert at creating compelling blog post titles. Generate ${count} catchy, SEO-friendly blog post titles.
        
Return ONLY the titles, one per line, without numbers or bullet points.`,
        prompt: `Topic: ${topic}`,
        temperature: 0.9,
      });

      const titles = text
        .split("\n")
        .filter((line) => line.trim())
        .slice(0, count);

      return {
        titles,
        topic,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error generating titles:", error);
      throw new Error(
        error instanceof Error
          ? `Failed to generate titles: ${error.message}`
          : "Failed to generate titles"
      );
    }
  },
});
