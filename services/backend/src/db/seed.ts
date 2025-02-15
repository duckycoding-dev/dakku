import { importJMdict } from '../scripts/import_data/vocabulary.import';
import { importSentences } from '../scripts/import_data/sentences.import';

await importJMdict('../../opensource_data_used/JMdict_e.xml');
await importSentences();
