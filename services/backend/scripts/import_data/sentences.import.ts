import { db } from '../../src/db';
import { sentences } from '../../src/features/sentences/sentences.db';
import fs from 'fs/promises';

async function importSentences() {
  const data = await fs.readFile(
    '../../opensource_data_used/sentences.tsv',
    'utf-8',
  );
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

importSentences();
