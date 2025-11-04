import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  createAgentUIStreamResponse,
  UIMessage,
} from 'ai';
import { blogAgent } from '@/lib/ai/blog-agent';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'Last message must be from user' }, { status: 400 });
    }

    return createAgentUIStreamResponse({
      agent: blogAgent,
      messages,
      sendSources: true,
      sendReasoning: true,
      onFinish: async (result) => {
        console.log('Agent finished:', result.messages);
        console.log('Agent parts:', result.messages.map(msg => msg.parts));
      },
    });

  } catch (error) {
    console.error('API route error:', error);
    
    // Provide more specific error messages based on the error type
    let errorMessage = 'Internal server error';
    let statusCode = 500;
    
    if (error instanceof Error) {
      // Handle specific AI SDK errors
      if (error.message.includes('Type validation failed')) {
        errorMessage = 'Tool configuration error. Please try again or contact support.';
        statusCode = 422;
      } else if (error.message.includes('No tool schema found')) {
        errorMessage = 'Tool not available. Please try a different approach.';
        statusCode = 422;
      } else if (error.message.includes('Unauthorized')) {
        errorMessage = 'Authentication required. Please sign in again.';
        statusCode = 401;
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
        statusCode = 429;
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: statusCode }
    );
  }
}