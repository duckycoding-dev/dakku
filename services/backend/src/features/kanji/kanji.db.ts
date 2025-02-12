import { pgTable, text, integer, jsonb } from 'drizzle-orm/pg-core';
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import type { z } from 'zod';

// Single Table for All Kanji Data
export const kanjis = pgTable('kanjis', {
  id: text('id').primaryKey(), // Kanji character itself
  grade: integer('grade'), // 1-10 (Education level)
  strokeCount: jsonb('stroke_count').$type<number[]>(), // Array of stroke counts
  frequency: integer('frequency'), // 1-2500 if available
  jlptLevel: integer('jlpt_level'), // JLPT level (1-4)
  radicalNames: jsonb('radical_names').$type<string[]>(), // Radical names in hiragana
  nanori: jsonb('nanori').$type<string[]>(), // Name readings
  meanings: jsonb('meanings').$type<{ lang: string; meaning: string }[]>(), // Meaning by language
  readings: jsonb('readings').$type<{ type: string; value: string }[]>(), // Readings (on, kun, pinyin, etc.)
  queryCodes: jsonb('query_codes').$type<{ type: string; value: string }[]>(), // SKIP, Four Corner, etc.
  codepoints: jsonb('codepoints').$type<{ type: string; value: string }[]>(), // Unicode, JIS, etc.
  dictionaryRefs:
    jsonb('dictionary_refs').$type<
      { type: string; value: string; mVol?: number; mPage?: number }[]
    >(), // Dictionary references
  variants: jsonb('variants').$type<{ type: string; value: string }[]>(), // Variant kanji mappings
});

const kanjiSelectSchema = createSelectSchema(kanjis);
const kanjiInsertSchema = createInsertSchema(kanjis);
const kanjiUpdateSchema = createUpdateSchema(kanjis);

export { kanjiSelectSchema, kanjiInsertSchema, kanjiUpdateSchema };

export type KanjiSelect = z.infer<typeof kanjiSelectSchema>;
export type KanjiInsert = z.infer<typeof kanjiInsertSchema>;
export type KanjiUpdate = z.infer<typeof kanjiUpdateSchema>;
