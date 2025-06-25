#!/usr/bin/env node

// Setup script for Pinecone integration
// Run with: node scripts/setup-pinecone.js

const fs = require('fs');
const path = require('path');

function createEnvTemplate() {
  const envTemplate = `# OpenAI API Key (existing)
OPENAI_API_KEY=your_openai_api_key_here

# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=ai-tools-comprehensive-v2
PINECONE_ENVIRONMENT=your_pinecone_environment_here
`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local template');
  } else {
    console.log('ℹ️  .env.local already exists');
  }
  
  return envPath;
}

function displayInstructions() {
  console.log(`
🚀 Pinecone Integration Setup Complete!

📋 Next Steps:

 1. Set up your Pinecone account:
   - Go to https://www.pinecone.io/
   - Create a new account or log in
   - Create a new index named "ai-tools-comprehensive-v2"
   - Use dimension: 1536 (for OpenAI text-embedding-3-small)
   - Use metric: cosine

 2. Update your .env.local file with:
   - PINECONE_API_KEY: Your Pinecone API key
   - PINECONE_INDEX_NAME: ai-tools-comprehensive-v2 (or your chosen name)
   - PINECONE_ENVIRONMENT: Your Pinecone environment (e.g., us-east-1-gcp)

3. Start your development server:
   npm run dev

 4. Sync your tools data to Pinecone:
   curl -X POST http://localhost:3000/api/sync-tools \\
     -H "Content-Type: application/json"

5. Test the integration:
   node tests/pinecone-integration.test.js

🔧 API Endpoints Created:
- POST /api/search - Vector search for tools
- POST /api/chat - Enhanced chat with RAG
- GET /api/sync-tools - Check sync status
- POST /api/sync-tools - Sync tools to Pinecone

💡 Your chat feature now uses RAG (Retrieval Augmented Generation) to provide
   more accurate and contextual responses based on your tools database!

🔐 Security Note: 
   Keep your API keys secure and never commit them to version control.
   The .env.local file is already in your .gitignore.
`);
}

function main() {
  console.log('🛠️  Setting up Pinecone integration...\n');
  
  try {
    createEnvTemplate();
    displayInstructions();
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createEnvTemplate, displayInstructions }; 