import { NextRequest, NextResponse } from 'next/server';
import { searchSimilarTools } from '@/util/pinecone';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Search for relevant tools using Pinecone
    let relevantTools: unknown[] = [];
    let contextPrompt = '';
    
    try {
      const searchResults = await searchSimilarTools(message, 3);
      relevantTools = searchResults
        .filter(match => match.score && match.score > -0.1 && match.metadata) // Filter by similarity threshold (adjusted for cosine similarity)
        .map(match => match.metadata)
        .filter(metadata => metadata !== undefined);
      
      if (relevantTools.length > 0) {
        contextPrompt = `\n\nBased on your query, here are some relevant AI development tools from our database:\n${relevantTools
          .map(tool => {
            const t = tool as Record<string, unknown>;
            return `- ${t?.name}: ${t?.description} (${t?.website_url})`;
          })
          .join('\n')}\n\nPlease incorporate these specific tools in your recommendations when relevant.`;
      }
    } catch (pineconeError) {
      console.warn('Pinecone search failed, falling back to regular chat:', pineconeError);
      // Continue with regular chat if Pinecone fails
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant that helps developers find the right tools for their projects. Based on what the user is trying to build, suggest relevant development tools, frameworks, or services that would be helpful.${contextPrompt}`,
          },
          {
            role: 'user', 
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });


    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    console.log(JSON.stringify(data.choices, null, 2))

    return NextResponse.json({ 
      response: aiResponse,
      relevantTools: relevantTools.length > 0 ? relevantTools : undefined
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}