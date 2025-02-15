import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { db } from '../../db';
import { vocabulary } from '../../features/vocabulary/vocabulary.db';
import type {
  Field,
  KanjiElement,
  KanjiInfo,
  KanjiTag,
  MiscInfo,
  PartOfSpeech,
  Priority,
  ReadingElement,
  ReadingInfo,
  Sense,
  Dialect,
  Vocabulary,
} from '../../features/vocabulary/vocabulary.types';

// Types based on DTD definitions
type XMLTextNode<T> = {
  text: T;
};

// Core interfaces for JMdict structure
interface JMdict {
  JMdict: {
    entry: JMdictEntry[];
  };
}

interface JMdictEntry {
  ent_seq: XMLTextNode<string>;
  k_ele?: XMLKanjiElement[];
  r_ele: XMLReadingElement[];
  sense: XMLSense[];
}

interface XMLKanjiElement {
  keb: XMLTextNode<string>;
  ke_inf?: XMLTextNode<KanjiInfo>[]; // KanjiInfo[]
  ke_pri?: XMLTextNode<Priority>[]; // Priority[]
}

interface XMLReadingElement {
  reb: XMLTextNode<string>;
  re_nokanji?: XMLTextNode<string>;
  re_restr?: XMLTextNode<string>[];
  re_inf?: XMLTextNode<ReadingInfo>[]; // ReadingInfo[]
  re_pri?: XMLTextNode<Priority>[]; // Priority[]
}

interface XMLSense {
  stagk?: XMLTextNode<string>[]; // Kanji elements that apply to this sense
  stagr?: XMLTextNode<string>[]; // Reading elements that apply to this sense
  pos?: XMLTextNode<PartOfSpeech>[]; // PartOfSpeech[]
  xref?: XMLTextNode<string>[]; // Cross-references
  ant?: XMLTextNode<string>[]; // Antonyms
  field?: XMLTextNode<Field>[]; // Field[]
  misc?: XMLTextNode<MiscInfo>[]; // MiscInfo[]
  s_inf?: XMLTextNode<string>[]; // Sense information
  lsource?: XMLLoanwordSource[]; // Loanword sources
  dial?: XMLTextNode<Dialect>[]; // Dialect[]
  gloss?: XMLGloss[]; // Glosses
}

interface XMLGloss {
  text: string;
  'xml:lang'?: string;
  g_gend?: string;
  g_type?: 'lit' | 'fig' | 'expl';
}

interface XMLLoanwordSource {
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
function getText<T>(node: XMLTextNode<T> | undefined): T | undefined {
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

export async function importJMdict(filePath: string) {
  console.log('⏳ Parsing XML file...');
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const dictionary: JMdict = parser.parse(xmlData);

  if (!dictionary.JMdict?.entry) {
    throw new Error('❌ No dictionary entries found in XML.');
  }

  console.log(`📝 Processing ${dictionary.JMdict.entry.length} entries...`);

  const entries: Vocabulary[] = dictionary.JMdict.entry.map((entry) => {
    // Process kanji elements
    const kanji: KanjiElement[] | undefined = entry.k_ele
      ? toArray(entry.k_ele).map((k) => ({
          text: k.keb.text,
          infos: toArray(k.ke_inf)
            .map((inf) => getText(inf))
            .filter((info) => info !== undefined),
          priorities: toArray(k.ke_pri)
            .map((pri) => getText(pri))
            .filter((pri) => pri !== undefined),
        }))
      : undefined;

    // Process reading elements
    const readings: ReadingElement[] = toArray(entry.r_ele).map((r) => ({
      text: r.reb.text,
      noKanji: r.re_nokanji ? true : false,
      restrictions: toArray(r.re_restr)
        .map((restr) => getText(restr))
        .filter((restr) => restr !== undefined),
      infos: toArray(r.re_inf)
        .map((inf) => getText(inf))
        .filter((inf) => inf !== undefined),
      priorities: toArray(r.re_pri)
        .map((pri) => getText(pri))
        .filter((pri) => pri !== undefined),
    }));

    // Process sense elements
    const senses: Sense[] = toArray(entry.sense).map((s) => ({
      stagk: toArray(s.stagk)
        .map((stagk) => getText(stagk))
        .filter((val) => val !== undefined),
      stagr: toArray(s.stagr)
        .map((stagr) => getText(stagr))
        .filter((val) => val !== undefined),
      partsOfSpeech: toArray(s.pos)
        .map((pos) => getText(pos))
        .filter((val) => val !== undefined),
      xrefs: toArray(s.xref)
        .map((xref) => getText(xref))
        .filter((val) => val !== undefined),
      ant: toArray(s.ant)
        .map((ant) => getText(ant))
        .filter((val) => val !== undefined),
      fields: toArray(s.field)
        .map((field) => getText(field))
        .filter((val) => val !== undefined),
      miscs: toArray(s.misc)
        .map((misc) => getText(misc))
        .filter((val) => val !== undefined),
      infos: toArray(s.s_inf)
        .map((inf) => getText(inf))
        .filter((val) => val !== undefined),
      loanwordSources: toArray(s.lsource)
        .map((ls) => ({
          originalWordOrSentence: ls.text,
          originalLang: ls['xml:lang'] || 'eng',
          type: ls.ls_type || 'full',
          waseieigo: ls.ls_wasei === 'y' ? true : false,
        }))
        .filter((val) => val !== undefined),
      dialects: toArray(s.dial)
        .map((dial) => getText(dial))
        .filter((val) => val !== undefined),
      glosses: toArray(s.gloss)
        .map((g) => ({
          text: g.text,
          lang: g['xml:lang'] || 'eng',
          gender: g.g_gend,
          type: g.g_type,
        }))
        .filter((val) => val !== undefined),
      antonyms: toArray(s.ant)
        .map((ant) => ant.text)
        .filter((val) => val !== undefined),
    }));

    // Collect all tags for searchability
    const tags: KanjiTag[] = Array.from(
      new Set(
        [
          ...senses.flatMap((s) => s.partsOfSpeech),
          ...senses.flatMap((s) => s.fields),
          ...senses.flatMap((s) => s.miscs),
        ].filter((val) => val !== undefined),
      ),
    );

    // Collect all priorities
    const priorities: Priority[] = Array.from(
      new Set(
        [
          ...(kanji ? kanji.flatMap((k) => k.priorities) : []),
          ...readings.flatMap((r) => r.priorities),
        ].filter(Boolean),
      ),
    );

    return {
      id: parseInt(entry.ent_seq.text, 10),
      kanji,
      readings,
      senses,
      tags: tags,
      priorities: priorities,
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
