import { streamText } from 'ai';
import fs from 'node:fs';
import path from 'node:path';
import { AiModel } from '~/ai';

const getSystemPrompt = () => {
  const aiDirectory = path.join(process.cwd(), '/data/ai/system.md');
  return fs.readFileSync(aiDirectory, 'utf8');
};

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: AiModel,
    system: getSystemPrompt(),
    prompt,
  });

  return result.toDataStreamResponse();
}
