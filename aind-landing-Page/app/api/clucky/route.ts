import { NextResponse } from 'next/server';
import toolsData from '@/public/tools-data.json';

export async function POST() {
  try {
    // Extract all tools from the tools-data.json
    const allTools = toolsData.domains
      .flatMap(domain => domain.categories)
      .flatMap(category => category.tools);

    // Randomly select 2-4 tools
    const numTools = Math.floor(Math.random() * 3) + 2; // 2-4 tools
    const selectedTools = [];
    const usedIndices = new Set();

    while (selectedTools.length < numTools) {
      const randomIndex = Math.floor(Math.random() * allTools.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedTools.push(allTools[randomIndex]);
      }
    }

    // Create a prompt for OpenAI with the selected tools
    const toolsInfo = selectedTools.map(tool => 
      `- ${tool.name}: ${tool.description} (Tags: ${tool.tags?.join(', ') || 'None'})`
    ).join('\n');

    const prompt = `You are a creative AI project generator. I've randomly selected these ${numTools} tools from an AI development landscape:

${toolsInfo}

Please come up with a fun, creative, and practical project idea that could use these tools together. The project should be:
1. Engaging and interesting
2. Feasible for someone to actually build
3. Make good use of the selected tools' capabilities
4. Be innovative or solve a real problem

Format your response as:
**Project Name:** [Creative name]

**Description:** [2-3 sentences describing the project]

**How it uses the tools:**
[For each tool, explain specifically how it would be used in this project]

**Why it's awesome:** [1-2 sentences about what makes this project special or useful]

Keep it fun and inspiring!`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.9,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "clucky_project",
            schema: {
              type: "object",
              properties: {
                text: {
                  type: "string",
                  description: "The formatted text response with project details"
                },
                tool_names: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "Array of exact tool names used in the project"
                }
              },
              required: ["text", "tool_names"],
              additionalProperties: false
            }
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const rawResponse = data.choices[0]?.message?.content;
    
    if (!rawResponse) {
      throw new Error('No response from OpenAI');
    }

    const parsedResponse = JSON.parse(rawResponse);
    const toolNames = selectedTools.map(tool => tool.name);

    return NextResponse.json({ 
      response: parsedResponse.text,
      tool_names: toolNames
    });
  } catch (error) {
    console.error('Clucky API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate clucky project idea' },
      { status: 500 }
    );
  }
}