import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { db } from '../../src/db';
import { vocabulary } from '../../src/features/vocabulary/vocabulary.db';

// Types based on DTD definitions
type TextNode = {
  text: string;
};

// String union types for categorization labels
type Dialect =
  | 'bra'
  | 'hob'
  | 'ksb'
  | 'ktb'
  | 'kyb'
  | 'kyu'
  | 'nab'
  | 'osb'
  | 'rkb'
  | 'thb'
  | 'tsb'
  | 'tsug';

type Field =
  | 'agric'
  | 'anat'
  | 'archeol'
  | 'archit'
  | 'art'
  | 'astron'
  | 'audvid'
  | 'aviat'
  | 'baseb'
  | 'biochem'
  | 'biol'
  | 'bot'
  | 'Buddh'
  | 'bus'
  | 'chem'
  | 'Christn'
  | 'comp'
  | 'econ'
  | 'engr'
  | 'finc'
  | 'food'
  | 'geogr'
  | 'geol'
  | 'law'
  | 'ling'
  | 'MA'
  | 'math'
  | 'med'
  | 'mil'
  | 'music'
  | 'physics'
  | 'sports'
  | 'telec'
  | 'zool';

type PartOfSpeech =
  | 'adj-i'
  | 'adj-na'
  | 'adj-no'
  | 'adj-pn'
  | 'adj-t'
  | 'adj-f'
  | 'adj-kari'
  | 'adj-ku'
  | 'adj-shiku'
  | 'adj-nari'
  | 'adv'
  | 'adv-to'
  | 'aux'
  | 'aux-v'
  | 'aux-adj'
  | 'conj'
  | 'cop'
  | 'ctr'
  | 'exp'
  | 'int'
  | 'n'
  | 'n-adv'
  | 'n-t'
  | 'n-pr'
  | 'n-suf'
  | 'n-pref'
  | 'num'
  | 'pn'
  | 'pref'
  | 'prt'
  | 'suf'
  | 'v1'
  | 'v5'
  | 'v5aru'
  | 'v5b'
  | 'v5g'
  | 'v5k'
  | 'v5n'
  | 'v5r'
  | 'v5s'
  | 'v5t'
  | 'v5u'
  | 'vi'
  | 'vk'
  | 'vn'
  | 'vr'
  | 'vs'
  | 'vt';

type MiscInfo =
  | 'abbr'
  | 'arch'
  | 'char'
  | 'chn'
  | 'col'
  | 'derog'
  | 'fam'
  | 'fem'
  | 'male'
  | 'hon'
  | 'hum'
  | 'id'
  | 'm-sl'
  | 'obs'
  | 'on-mim'
  | 'pol'
  | 'rare'
  | 'sl'
  | 'uk'
  | 'vulg'
  | 'work';

type Priority =
  | 'news1'
  | 'news2'
  | 'ichi1'
  | 'ichi2'
  | 'spec1'
  | 'spec2'
  | 'gai1'
  | 'gai2'
  | `nf${string}`;

type ReadingInfo = 'gikun' | 'ik' | 'ok' | 'rk' | 'sk';
type KanjiInfo = 'ateji' | 'ik' | 'iK' | 'io' | 'oK' | 'rK' | 'sK';

// Core interfaces for JMdict structure
interface JMdict {
  JMdict: {
    entry: JMdictEntry[];
  };
}

interface JMdictEntry {
  ent_seq: TextNode;
  k_ele?: KanjiElement[];
  r_ele: ReadingElement[];
  sense: Sense[];
}

interface KanjiElement {
  keb: TextNode;
  ke_inf?: TextNode[]; // KanjiInfo[]
  ke_pri?: TextNode[]; // Priority[]
}

interface ReadingElement {
  reb: TextNode;
  re_nokanji?: TextNode;
  re_restr?: TextNode[];
  re_inf?: TextNode[]; // ReadingInfo[]
  re_pri?: TextNode[]; // Priority[]
}

interface Sense {
  pos?: TextNode[]; // PartOfSpeech[]
  field?: TextNode[]; // Field[]
  misc?: TextNode[]; // MiscInfo[]
  dial?: TextNode[]; // Dialect[]
  gloss: Gloss[];
  s_inf?: TextNode[];
  lsource?: LoanwordSource[];
}

interface Gloss {
  text: string;
  'xml:lang'?: string;
  g_gend?: string;
  g_type?: 'lit' | 'fig' | 'expl';
}

interface LoanwordSource {
  text?: string;
  'xml:lang'?: string;
  ls_type?: 'full' | 'part';
  ls_wasei?: 'y';
}

// Helper function to convert text nodes to arrays
function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

// Helper function to extract text from TextNode
function getText(node: TextNode | undefined): string | undefined {
  return node?.text;
}

// Parser configuration
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: 'text',
  alwaysCreateTextNode: true,
  parseTagValue: true,
  parseAttributeValue: true,
});

async function importJMdict(filePath: string) {
  console.log('⏳ Parsing XML file...');
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const dictionary: JMdict = parser.parse(xmlData);

  if (!dictionary.JMdict?.entry) {
    throw new Error('❌ No dictionary entries found in XML.');
  }

  console.log(`📝 Processing ${dictionary.JMdict.entry.length} entries...`);

  const entries = dictionary.JMdict.entry.map((entry) => {
    const found = entry.r_ele.find((e) => e.reb.text === 'やまびこ');
    if (found) {
      console.log(found);
    }
    // Process kanji elements
    const kanji = toArray(entry.k_ele).map((k) => ({
      text: k.keb.text,
      info: toArray(k.ke_inf).map((inf) => getText(inf)),
      priorities: toArray(k.ke_pri).map((pri) => getText(pri)),
    }));

    // Process reading elements
    const readings = toArray(entry.r_ele).map((r) => ({
      text: r.reb.text,
      noKanji: r.re_nokanji ? true : false,
      restrictions: toArray(r.re_restr).map((restr) => getText(restr)),
      info: toArray(r.re_inf).map((inf) => getText(inf)),
      priorities: toArray(r.re_pri).map((pri) => getText(pri)),
    }));

    // Process sense elements
    const senses = toArray(entry.sense).map((s) => ({
      partsOfSpeech: toArray(s.pos).map((pos) => getText(pos)),
      fields: toArray(s.field).map((field) => getText(field)),
      misc: toArray(s.misc).map((misc) => getText(misc)),
      dialects: toArray(s.dial).map((dial) => getText(dial)),
      info: toArray(s.s_inf).map((inf) => getText(inf)),
      glosses: toArray(s.gloss).map((g) => ({
        text: g.text,
        lang: g['xml:lang'] || 'eng',
        gender: g.g_gend,
        type: g.g_type,
      })),
    }));

    // Collect all tags for searchability
    const tags = new Set(
      [
        ...senses.flatMap((s) => s.partsOfSpeech),
        ...senses.flatMap((s) => s.fields),
        ...senses.flatMap((s) => s.misc),
      ].filter(Boolean),
    );

    // Collect all priorities
    const priorities = new Set(
      [
        ...kanji.flatMap((k) => k.priorities),
        ...readings.flatMap((r) => r.priorities),
      ].filter(Boolean),
    );

    return {
      id: parseInt(entry.ent_seq.text, 10),
      kanji,
      readings,
      senses,
      tags: Array.from(tags),
      priority: Array.from(priorities),
    };
  });

  console.log('💾 Inserting entries into database...');

  // Insert in chunks to avoid memory issues
  const CHUNK_SIZE = 1000;
  for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
    const chunk = entries.slice(i, i + CHUNK_SIZE);
    await db.insert(vocabulary).values(chunk).onConflictDoNothing();
    console.log(
      `✅ Processed entries ${i + 1} to ${Math.min(i + CHUNK_SIZE, entries.length)}`,
    );
  }

  console.log('✨ Import completed successfully!');
}

// Run the import
const XML_FILE_PATH = '../../opensource_data_used/JMdict_e.xml';
importJMdict(XML_FILE_PATH).catch(console.error);
