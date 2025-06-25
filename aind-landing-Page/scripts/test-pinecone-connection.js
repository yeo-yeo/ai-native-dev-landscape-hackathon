// Simple test script to verify Pinecone connection
// Run with: node scripts/test-pinecone-connection.js

require('dotenv').config({ path: '.env.local' });
const { Pinecone } = require('@pinecone-database/pinecone');

async function testConnection() {
  console.log('🔍 Testing Pinecone Connection...\n');
  
  // Check environment variables
  console.log('Environment variables:');
  console.log('PINECONE_API_KEY:', process.env.PINECONE_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('PINECONE_INDEX_NAME:', process.env.PINECONE_INDEX_NAME || '❌ Missing');
  console.log('PINECONE_ENVIRONMENT:', process.env.PINECONE_ENVIRONMENT || '❌ Missing');
  console.log('');

  if (!process.env.PINECONE_API_KEY) {
    console.log('❌ PINECONE_API_KEY is missing from .env.local');
    return;
  }

  try {
    // Initialize Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    console.log('🔌 Attempting to connect to Pinecone...');

    // Get index info
    const indexName = process.env.PINECONE_INDEX_NAME || 'ai-tools-comprehensive-v2';
    console.log(`📊 Checking index: ${indexName}`);

    const index = pinecone.index(indexName);
    
    // Try to get index stats
    const stats = await index.describeIndexStats();
    console.log('✅ Connection successful!');
    console.log('📈 Index stats:', stats);

  } catch (error) {
    console.log('❌ Connection failed:');
    console.log('Error type:', error.constructor.name);
    console.log('Error message:', error.message);
    
    if (error.message.includes('rejected')) {
      console.log('\n💡 Suggestions:');
      console.log('1. Verify your PINECONE_API_KEY is correct');
      console.log('2. Check that your API key has access to the index');
      console.log('3. Ensure the index name "ai-tools-comprehensive-v2" exists');
    }
  }
}

testConnection().catch(console.error); 