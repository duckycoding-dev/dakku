import { db } from '../../db';
import { sentences } from '../../features/sentences/sentences.db';
import fs from 'fs/promises';

export async function importSentences(filePath: string) {
  const data = await fs.readFile(filePath, 'utf-8');
  const lines = data.split('\n');

  for (const line of lines) {
    const [englishId, english, japaneseId, japanese] = line.split('\t');
    console.log(englishId, english, japaneseId, japanese);
    await db.insert(sentences).values({
      japanese: japanese,
      english: english,
    });
  }

  console.log('Sentences import complete!');
}
