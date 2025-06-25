import { NextResponse } from 'next/server';
import { upsertToolsData } from '@/util/pinecone';
import toolsData from '@/public/tools-data.json';

export async function POST() {
  try {
    // No authorization required for simplicity

    // Flatten all tools from the JSON data
    const allTools = toolsData.domains.flatMap((domain) =>
      domain.categories.flatMap((category) =>
        category.tools.map((tool) => ({
          ...tool,
          domainName: domain.name,
          categoryName: category.name,
        }))
      )
    );

    console.log(`Syncing ${allTools.length} tools to Pinecone...`);

    // Upsert tools to Pinecone
    const result = await upsertToolsData(allTools);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.count} tools to Pinecone`,
      totalTools: allTools.length,
    });
  } catch (error) {
    console.error('Sync tools API error:', error);
    return NextResponse.json(
      { error: 'Failed to sync tools to Pinecone' },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const allTools = toolsData.domains.flatMap((domain) =>
      domain.categories.flatMap((category) => category.tools)
    );

    return NextResponse.json({
      totalTools: allTools.length,
      lastUpdate: new Date().toISOString(),
      message: 'Ready to sync tools to Pinecone',
    });
  } catch (error) {
    console.error('Get sync status error:', error);
    return NextResponse.json(
      { error: 'Failed to get sync status' },
      { status: 500 }
    );
  }
} 