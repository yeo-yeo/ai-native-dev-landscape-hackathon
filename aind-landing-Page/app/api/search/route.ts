import { NextRequest, NextResponse } from 'next/server';
import { searchSimilarTools } from '@/util/pinecone';

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 5 } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Search for similar tools using Pinecone
    const results = await searchSimilarTools(query, limit);

    // Format the results
    const formattedResults = results.map((match) => ({
      id: match.id,
      score: match.score,
      tool: match.metadata,
    }));

    return NextResponse.json({
      query,
      results: formattedResults,
      total: results.length,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search tools' },
      { status: 500 }
    );
  }
} 