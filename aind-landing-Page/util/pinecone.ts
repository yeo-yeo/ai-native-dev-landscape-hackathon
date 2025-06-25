import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});

// Initialize OpenAI client for embeddings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Get the Pinecone index
export async function getPineconeIndex() {
  const indexName = process.env.PINECONE_INDEX_NAME || 'ai-tools-comprehensive-v2';
  return pinecone.index(indexName);
}

// Generate embeddings using OpenAI
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Search for similar vectors in Pinecone
export async function searchSimilarTools(query: string, topK: number = 5) {
  try {
    const index = await getPineconeIndex();
    const queryEmbedding = await generateEmbedding(query);
    
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });
    
    return searchResults.matches || [];
  } catch (error) {
    console.error('Error searching similar tools:', error);
    throw error;
  }
}

// Upsert tools data to Pinecone
export async function upsertToolsData(tools: any[]) {
  try {
    const index = await getPineconeIndex();
    
    const vectors = await Promise.all(
      tools.map(async (tool, idx) => {
        const searchableText = `${tool.name} ${tool.description} ${tool.tags?.join(' ') || ''}`;
        const embedding = await generateEmbedding(searchableText);
        
        return {
          id: `tool-${idx}-${tool.name.replace(/\s+/g, '-').toLowerCase()}`,
          values: embedding,
          metadata: {
            name: tool.name,
            description: tool.description,
            website_url: tool.website_url,
            tags: tool.tags || [],
            domainName: tool.domainName,
            categoryName: tool.categoryName,
            popular: tool.popular,
            oss: tool.oss,
            verified: tool.verified,
          },
        };
      })
    );
    
    // Upsert in batches to avoid rate limits
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
    }
    
    return { success: true, count: vectors.length };
  } catch (error) {
    console.error('Error upserting tools data:', error);
    throw error;
  }
} 