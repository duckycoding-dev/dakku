import { db } from '../../src/db';
import { vocabulary } from '../../src/features/vocabulary/vocabulary.db';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs/promises';

async function importVocabData() {
  const xml = await fs.readFile(
    '../../../../opensource_data_used/JMdict_e.xml',
    'utf-8',
  );
  const json = new XMLParser().parse(xml).JMdict.entry;

  const vocabArray = json.map((v) => ({
    id: v.keb ? v.keb[0] : v.reb[0],
    reading: v.reb ? v.reb[0] : null,
    meaning: v.sense.map((s) => s.gloss[0].text).join(', '),
  }));

  for (const entry of vocabArray) {
    // await db.insert(vocabulary).values(entry);
    console.log(entry);
  }

  console.log('✅ Vocabulary import complete!');
}

importVocabData();
