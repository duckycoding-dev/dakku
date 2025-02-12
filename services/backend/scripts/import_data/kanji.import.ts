/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { db } from '../../src/db'; // Import your Drizzle DB setup
import { kanjis } from '../../src/features/kanji/kanji.db'; // Import the kanji table

async function importKanji() {
  const xmlData = fs.readFileSync('part_of_data.xml', 'utf-8');
  const jsonData: any = new XMLParser().parse(xmlData);

  const kanjiEntries = jsonData.map((char: any) => ({
    id: char.literal._text,
    grade: char.misc?.grade?._text
      ? parseInt(char.misc.grade._text, 10)
      : undefined,
    strokeCount: (Array.isArray(char.misc?.stroke_count)
      ? char.misc.stroke_count
      : [char.misc?.stroke_count]
    ).map((s: any) => parseInt(s._text, 10)),
    frequency: char.misc?.freq?._text
      ? parseInt(char.misc.freq._text, 10)
      : undefined,
    jlptLevel: char.misc?.jlpt?._text
      ? parseInt(char.misc.jlpt._text, 10)
      : undefined,
    radicalNames: (Array.isArray(char.misc?.rad_name)
      ? char.misc.rad_name
      : [char.misc?.rad_name]
    ).map((r: any) => r._text),
    nanori: (Array.isArray(char.reading_meaning?.nanori)
      ? char.reading_meaning.nanori
      : [char.reading_meaning?.nanori]
    ).map((n: any) => n._text),
    meanings: (Array.isArray(char.reading_meaning?.rmgroup?.meaning)
      ? char.reading_meaning.rmgroup.meaning
      : [char.reading_meaning?.rmgroup?.meaning]
    ).map((m: any) => ({
      lang: m._attributes?.m_lang || 'en',
      meaning: m._text,
    })),
    readings: (Array.isArray(char.reading_meaning?.rmgroup?.reading)
      ? char.reading_meaning.rmgroup.reading
      : [char.reading_meaning?.rmgroup?.reading]
    ).map((r: any) => ({
      type: r._attributes.r_type,
      value: r._text,
    })),
    queryCodes: (Array.isArray(char.query_code?.q_code)
      ? char.query_code.q_code
      : [char.query_code?.q_code]
    ).map((q: any) => ({
      type: q._attributes.qc_type,
      value: q._text,
    })),
    codepoints: (Array.isArray(char.codepoint?.cp_value)
      ? char.codepoint.cp_value
      : [char.codepoint?.cp_value]
    ).map((cp: any) => ({
      type: cp._attributes.cp_type,
      value: cp._text,
    })),
    dictionaryRefs: (Array.isArray(char.dic_number?.dic_ref)
      ? char.dic_number.dic_ref
      : [char.dic_number?.dic_ref]
    ).map((dic: any) => ({
      type: dic._attributes.dr_type,
      value: dic._text,
      mVol: dic._attributes?.m_vol
        ? parseInt(dic._attributes.m_vol, 10)
        : undefined,
      mPage: dic._attributes?.m_page
        ? parseInt(dic._attributes.m_page, 10)
        : undefined,
    })),
    variants: (Array.isArray(char.misc?.variant)
      ? char.misc.variant
      : [char.misc?.variant]
    ).map((varItem: any) => ({
      type: varItem._attributes.var_type,
      value: varItem._text,
    })),
  }));

  await db.insert(kanjis).values(kanjiEntries).onConflictDoNothing();

  console.log('✅ Kanji data imported successfully!');
}

importKanji();
