// Test script for Pinecone integration
// Run with: node tests/pinecone-integration.test.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function testSearchAPI() {
  console.log('🔍 Testing Pinecone Search API...');
  
  try {
    const response = await fetch(`${API_BASE}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'AI coding assistant',
        limit: 3
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Search API test passed');
      console.log(`Found ${data.results.length} results:`);
      data.results.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.tool.name} (score: ${result.score.toFixed(3)})`);
      });
    } else {
      console.log('❌ Search API test failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Search API test error:', error.message);
  }
}

async function testChatWithRAG() {
  console.log('\n💬 Testing Chat API with RAG...');
  
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'I need help building a chatbot for my website'
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Chat API with RAG test passed');
      console.log('Response:', data.response.substring(0, 200) + '...');
      if (data.relevantTools) {
        console.log(`Found ${data.relevantTools.length} relevant tools from Pinecone`);
        data.relevantTools.forEach((tool, index) => {
          console.log(`  ${index + 1}. ${tool.name}`);
        });
      }
    } else {
      console.log('❌ Chat API test failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Chat API test error:', error.message);
  }
}

async function testSyncStatus() {
  console.log('\n📊 Testing Sync Status API...');
  
  try {
    const response = await fetch(`${API_BASE}/api/sync-tools`, {
      method: 'GET',
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Sync status test passed');
      console.log(`Total tools available: ${data.totalTools}`);
      console.log(`Last update: ${data.lastUpdate}`);
    } else {
      console.log('❌ Sync status test failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Sync status test error:', error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Pinecone Integration Tests\n');
  
  await testSyncStatus();
  await testSearchAPI();
  await testChatWithRAG();
  
  console.log('\n✨ All tests completed!');
  console.log('\n💡 To sync your tools to Pinecone, run:');
  console.log('curl -X POST http://localhost:3000/api/sync-tools \\');
  console.log('  -H "Content-Type: application/json"');
}

// Check if running directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testSearchAPI,
  testChatWithRAG,
  testSyncStatus,
  runAllTests
}; 