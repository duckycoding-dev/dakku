import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { db } from '../../db'; // Import your Drizzle DB setup
import { kanjis } from '../../features/kanji/kanji.db'; // Import the kanji table

export type KanjiDic2 = {
  kanjidic2: {
    header: {
      file_version: { text: string };
      database_version: { text: string };
      date_of_creation: { text: string };
    };
    character: KanjiCharacter[];
  };
};

export type KanjiCharacter = {
  literal: { text: string }; // The kanji character itself
  codepoint: {
    cp_value: Codepoint[];
  };
  radical: {
    rad_value: Radical[];
  };
  misc: MiscInfo;
  dic_number?: {
    dic_ref: DictionaryReference[];
  };
  query_code?: {
    q_code: QueryCode[];
  };
  reading_meaning?: {
    rmgroup?: ReadingMeaningGroup[];
    nanori?: { text: string }[]; // Name readings
  };
};

// Unicode and JIS Codepoints
export type Codepoint = {
  cp_type: string;
  text: string;
};

// Radical information
export type Radical = {
  rad_type: string;
  text: string;
};

// Miscellaneous metadata
export type MiscInfo = {
  grade?: { text: string }; // School grade (1-10)
  stroke_count: { text: string }[]; // Stroke count(s)
  variant?: Variant[];
  freq?: { text: string }; // Kanji frequency rank (1-2500)
  rad_name?: { text: string }[]; // Radical names
  jlpt?: { text: string }; // JLPT level (1-4)
};

// Kanji Variants (old/new forms)
export type Variant = {
  var_type: string;
  text: string;
};

// Dictionary references
export type DictionaryReference = {
  dr_type: string;
  text: string;
  m_vol?: { text: string };
  m_page?: { text: string };
};

// Query codes for searching kanji
export type QueryCode = {
  qc_type: string;
  text: string;
  skip_misclass?: string;
};

// Readings and meanings
export type ReadingMeaningGroup = {
  reading?: Reading[];
  meaning?: Meaning[];
};

// Readings (on-yomi, kun-yomi, pinyin, etc.)
export type Reading = {
  r_type: string;
  text: string;
  on_type?: string;
  r_status?: string;
};

// Meaning in different languages
export type Meaning = {
  m_lang?: string;
  text: string;
};

// XML Parser Configuration
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: 'text',
  alwaysCreateTextNode: true,
  parseTagValue: true,
  parseAttributeValue: true,
});

// Function to Parse XML
function parseXMLFile(filePath: string): KanjiDic2 {
  console.log('⏳ Parsing XML file...');
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const jsonData: KanjiDic2 = parser.parse(xmlData);
  console.log('✅ XML parsed successfully!');
  return jsonData;
}

// Helper function: Ensures the value is always an array
function toArray<T>(value: T | T[] | undefined): T[] {
  return value ? (Array.isArray(value) ? value : [value]) : [];
}

// Function to Import Data into PostgreSQL
async function importKanji() {
  const kanjiData = parseXMLFile(
    '../../../../opensource_data_used/kanjidic2.xml',
  );

  if (!kanjiData.kanjidic2?.character) {
    console.error('❌ No kanji data found in XML.');
    return;
  }

  console.log('✅ Extracting kanji data...');

  const kanjiEntries = kanjiData.kanjidic2.character.map((char) => ({
    id: char.literal.text,
    grade: char.misc?.grade?.text
      ? parseInt(char.misc.grade.text, 10)
      : undefined,
    strokeCount: toArray(char.misc?.stroke_count).map((s) =>
      parseInt(s.text, 10),
    ),
    frequency: char.misc?.freq?.text
      ? parseInt(char.misc.freq.text, 10)
      : undefined,
    jlptLevel: char.misc?.jlpt?.text
      ? parseInt(char.misc.jlpt.text, 10)
      : undefined,
    radicalNames: toArray(char.misc?.rad_name).map((r) => r.text),
    nanori: toArray(char.reading_meaning?.nanori).map((n) => n.text),
    meanings: toArray(char.reading_meaning?.rmgroup).flatMap((rm) =>
      toArray(rm.meaning).map((m) => ({
        lang: m.m_lang || 'en',
        meaning: m.text,
      })),
    ),
    readings: toArray(char.reading_meaning?.rmgroup).flatMap((rm) =>
      toArray(rm.reading).map((r) => ({ type: r.r_type, value: r.text })),
    ),
    queryCodes: toArray(char.query_code?.q_code).map((q) => ({
      type: q.qc_type,
      value: q.text,
    })),
    codepoints: toArray(char.codepoint.cp_value).map((cp) => ({
      type: cp.cp_type,
      value: cp.text,
    })),
    dictionaryRefs: toArray(char.dic_number?.dic_ref).map((dic) => ({
      type: dic.dr_type,
      value: dic.text,
      mVol: dic.m_vol ? parseInt(dic.m_vol.text, 10) : undefined,
      mPage: dic.m_page ? parseInt(dic.m_page.text, 10) : undefined,
    })),
    variants: toArray(char.misc?.variant).map((varItem) => ({
      type: varItem.var_type,
      value: varItem.text,
    })),
  }));

  console.log(`📥 Preparing to insert ${kanjiEntries.length} kanji entries...`);
  const batchSize = 500;
  for (let i = 0; i < kanjiEntries.length; i += batchSize) {
    const batch = kanjiEntries.slice(i, i + batchSize);
    await db.insert(kanjis).values(batch).onConflictDoNothing();
    console.log(`✅ Inserted batch ${i / batchSize + 1}`);
  }
  console.log('✅ Kanji data imported successfully!');
}

// Run the import
importKanji();
