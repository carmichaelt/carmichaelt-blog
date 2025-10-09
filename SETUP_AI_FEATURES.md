# AI Features Setup Guide

This guide will help you set up the AI-powered blog content generation feature.

## Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Convex Deployment**: Ensure your Convex project is set up and running

## Setup Steps

### 1. Add Environment Variable

Add your OpenAI API key to your Convex environment:

```bash
# Using Convex CLI
npx convex env set OPENAI_API_KEY your_openai_api_key_here
```

Or add it through the [Convex Dashboard](https://dashboard.convex.dev/):
1. Navigate to your project
2. Go to Settings > Environment Variables
3. Add `OPENAI_API_KEY` with your API key value

### 2. Deploy Convex Functions

After adding the `convex/ai.ts` file, you need to deploy it to Convex:

```bash
# If using development mode
npx convex dev

# Or deploy to production
npx convex deploy
```

This will:
- Generate TypeScript types for the new AI actions
- Make the actions available to your application
- Update the `convex/_generated/api.ts` file

### 3. Verify Installation

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Sign in with Clerk authentication

3. Navigate to `/create-post`

4. Look for the "AI Suggest" button in the rich text editor toolbar

## Usage

### Generating Blog Content

1. Click the **"AI Suggest"** button in the editor toolbar
2. Enter your topic or prompt (e.g., "The future of web development")
3. Choose your preferences:
   - **Tone**: Professional, Casual, Technical, or Conversational
   - **Length**: Short (~300 words), Medium (~800 words), or Long (~1500 words)
4. Click **"Generate Content"**
5. The AI-generated content will be inserted into the editor

### Available AI Actions

The `convex/ai.ts` file provides three actions:

1. **`generateBlogContent`**: Generates complete blog posts from prompts
   - Parameters: `prompt`, `tone`, `length`
   - Returns: Formatted HTML content ready for publishing

2. **`improveContent`**: Enhances existing content based on instructions
   - Parameters: `content`, `instruction`
   - Returns: Improved version of the content

3. **`generateTitleSuggestions`**: Creates multiple title options for a topic
   - Parameters: `topic`, `count` (optional)
   - Returns: Array of SEO-friendly title suggestions

## Customization

### Adjusting AI Behavior

Edit `convex/ai.ts` to customize:

- **Models**: Change from `gpt-4o-mini` to other OpenAI models like `gpt-4o` for better quality
- **Temperature**: Adjust creativity (0.0 = deterministic, 1.0 = creative)
- **System Prompts**: Modify tone and style instructions
- **Length Instructions**: Customize word count targets

Example:
```typescript
model: openai("gpt-4o"), // Use GPT-4 for better quality
temperature: 0.8, // Increase creativity
```

### Adding Custom Tones

In `convex/ai.ts`, add new tone options:

```typescript
const toneInstructions = {
  professional: "...",
  casual: "...",
  // Add your custom tone
  humorous: "Use a light, humorous tone with appropriate jokes and wit.",
};
```

Then update the UI in `rich-text-editor.tsx` to include the new option.

## Troubleshooting

### "OPENAI_API_KEY environment variable is not set"

- Ensure you've set the environment variable in Convex (not just in `.env.local`)
- Restart your Convex dev server after setting environment variables
- Check that the variable is visible in the Convex dashboard

### "Property 'ai' does not exist on type"

- Run `npx convex dev` or `npx convex deploy` to regenerate types
- The `convex/_generated/api.ts` file should include `ai` exports
- Restart your TypeScript server in your IDE

### AI Generation Fails

- Check your OpenAI API key is valid and has available credits
- Verify you're not hitting rate limits
- Check the browser console and Convex logs for detailed error messages

### Content Not Formatting Properly

- The AI returns HTML content; ensure your editor can handle HTML
- Check that TipTap is properly configured to accept HTML input
- Review the system prompts in `convex/ai.ts` for formatting instructions

## Security Considerations

1. **Never expose your OpenAI API key** in client-side code
2. The key should only be set in Convex environment variables
3. All AI operations run server-side through Convex actions
4. Consider implementing rate limiting for production use
5. Monitor your OpenAI usage and costs

## Cost Management

- `gpt-4o-mini` is cost-effective for most use cases (~$0.15 per million input tokens)
- Consider implementing:
  - Per-user rate limits
  - Monthly usage caps
  - Content caching for repeated prompts
  - Progressive disclosure (show cost estimates before generation)

## Future Enhancements

Potential features to add:

1. **Content Editing**: Use `improveContent` action for refining sections
2. **Title Suggestions**: Integrate `generateTitleSuggestions` into the post creation flow
3. **SEO Optimization**: Add actions for meta descriptions and keywords
4. **Multi-language Support**: Generate content in different languages
5. **Content Templates**: Pre-defined prompts for common blog types
6. **History Tracking**: Save and reuse previous AI generations

## Support

For issues or questions:
- Check the [Vercel AI SDK docs](https://sdk.vercel.ai/docs)
- Review [Convex documentation](https://docs.convex.dev)
- Visit [OpenAI API documentation](https://platform.openai.com/docs)
