import { importJMdict } from '../scripts/import_data/vocabulary.import';
import { importSentences } from '../scripts/import_data/sentences.import';
import { importKanji } from 'scripts/import_data/kanji.import/';

await importKanji('../../opensource_data_used/kanjidic2.xml');
await importJMdict('../../opensource_data_used/JMdict_e.xml');
await importSentences('../../opensource_data_used/sentences.tsv');
