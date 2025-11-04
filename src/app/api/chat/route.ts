import { streamContentSuggestion } from '@/lib/ai/functions/stream-content-suggestion';
import { streamObject } from 'ai';
import { UIMessage } from 'ai';
import z from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  
  const result = await streamContentSuggestion(messages);
  console.log("result", result);

  return result.toJsonResponse();
}