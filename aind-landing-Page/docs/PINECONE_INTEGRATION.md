# Pinecone Integration Guide

This guide explains how to integrate Pinecone vector database with your AI-native dev landscape application to enhance search capabilities with semantic similarity.

## Overview

The Pinecone integration adds vector search capabilities to your application, enabling:
- **Semantic Search**: Find tools based on meaning, not just keywords
- **Enhanced Chat**: RAG (Retrieval Augmented Generation) for more contextual responses
- **Intelligent Recommendations**: AI-powered tool suggestions based on user queries

## Architecture

```
User Query → OpenAI Embeddings → Pinecone Vector Search → Relevant Tools → Enhanced LLM Response
```

## Setup Instructions

### 1. Install Dependencies

The required packages are already installed:
- `@pinecone-database/pinecone`: Pinecone SDK
- `openai`: OpenAI SDK for embeddings

### 2. Pinecone Account Setup

1. Go to [Pinecone Console](https://www.pinecone.io/)
2. Create an account or log in
3. Create a new index with these settings:
   - **Index Name**: `ai-tools-comprehensive-v2`
   - **Dimension**: `1536` (for OpenAI text-embedding-3-small)
   - **Metric**: `cosine`
   - **Environment**: Choose your preferred region

### 3. Environment Variables

Your `.env.local` file should contain:

```env
# OpenAI API Key (existing)
OPENAI_API_KEY=your_openai_api_key_here

# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=ai-tools-comprehensive-v2
PINECONE_ENVIRONMENT=your_pinecone_environment_here
```

### 4. Sync Tools Data

Before using the search features, sync your tools data to Pinecone:

```bash
curl -X POST http://localhost:3000/api/sync-tools \
  -H "Content-Type: application/json"
```

## API Endpoints

### POST `/api/search`

Semantic search for tools using vector similarity.

**Request:**
```json
{
  "query": "AI coding assistant",
  "limit": 5
}
```

**Response:**
```json
{
  "query": "AI coding assistant",
  "results": [
    {
      "id": "tool-123-cursor",
      "score": 0.95,
      "tool": {
        "name": "Cursor",
        "description": "AI-powered code editor",
        "website_url": "https://cursor.sh",
        "tags": ["AI", "Code", "Editor"]
      }
    }
  ],
  "total": 1
}
```

### POST `/api/chat` (Enhanced)

Your existing chat endpoint now uses RAG for more contextual responses.

**Request:**
```json
{
  "message": "I need help building a chatbot"
}
```

**Response:**
```json
{
  "response": "Based on your needs, I recommend...",
  "relevantTools": [
    {
      "name": "Langchain",
      "description": "LLM application framework",
      "website_url": "https://langchain.com"
    }
  ]
}
```

### GET `/api/sync-tools`

Check sync status and available tools count.

### POST `/api/sync-tools`

Sync tools data to Pinecone.

## Testing

Run the integration tests:

```bash
node tests/pinecone-integration.test.js
```

This will test:
- Search API functionality
- Chat API with RAG
- Sync status endpoint

## How It Works

### 1. Data Indexing

When you run the sync command:
1. All tools from `tools-data.json` are processed
2. Each tool's name, description, and tags are combined into searchable text
3. OpenAI generates embeddings for each tool
4. Embeddings are stored in Pinecone with metadata

### 2. Search Process

When a user searches:
1. Query is converted to embeddings using OpenAI
2. Pinecone finds similar vectors using cosine similarity
3. Results are ranked by similarity score
4. Tool metadata is returned with similarity scores

### 3. Enhanced Chat (RAG)

When a user chats:
1. User message is used to search for relevant tools
2. Similar tools (score > 0.7) are included in the LLM context
3. GPT generates responses with specific tool recommendations
4. Response includes both generated text and relevant tools

## Configuration

### Similarity Threshold

Adjust the similarity threshold in `/api/chat/route.ts`:

```typescript
.filter(match => match.score && match.score > 0.7) // Adjust threshold here
```

### Embedding Model

Change the embedding model in `/util/pinecone.ts`:

```typescript
model: 'text-embedding-3-small', // or 'text-embedding-3-large'
```

### Search Results Limit

Adjust the number of results in search calls:

```typescript
const searchResults = await searchSimilarTools(message, 3); // Adjust limit
```

## Troubleshooting

### Common Issues

1. **"Index not found"**: Ensure your Pinecone index is created and the name matches
2. **"API key invalid"**: Verify your Pinecone API key is correct
3. **"Dimension mismatch"**: Ensure your index dimension matches the embedding model (1536 for text-embedding-3-small)
4. **"No results returned"**: Try lowering the similarity threshold or syncing more data

### Debug Mode

Enable debug logging in `/util/pinecone.ts`:

```typescript
console.log('Search results:', searchResults);
console.log('Query embedding:', queryEmbedding.slice(0, 5));
```

## Performance Optimization

### Batch Processing

Tools are synced in batches of 100 to avoid rate limits:

```typescript
const batchSize = 100; // Adjust based on your needs
```

### Caching

Consider implementing caching for frequent queries:

```typescript
// Add to your API routes
const cache = new Map();
const cacheKey = `search:${query}`;
if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}
```

## Security

- API keys are stored in environment variables
- Sync endpoint requires authorization header
- Never commit API keys to version control
- Use HTTPS in production

## Next Steps

1. **Frontend Integration**: Add vector search to your UI components
2. **Advanced Filtering**: Combine vector search with traditional filters
3. **User Analytics**: Track search patterns and improve recommendations
4. **Real-time Updates**: Implement webhooks for automatic syncing

## Support

For issues with:
- **Pinecone**: Check [Pinecone Documentation](https://docs.pinecone.io/)
- **OpenAI**: Check [OpenAI API Documentation](https://platform.openai.com/docs)
- **This Integration**: Review the test files and API endpoints 