import { pgTable, text, jsonb, serial } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import type {
  Codepoint,
  DictionaryReference,
  MiscInfo,
  QueryCode,
  Radical,
  ReadingMeaningGroup,
} from './kanji.types';

// Single Table for All Kanji Data
export const kanjis = pgTable('kanjis', {
  id: serial().primaryKey(), // Kanji character itself
  literal: text().notNull(), // The kanji character itself
  codepoints: jsonb().$type<Codepoint[]>().default([]).notNull(), // Unicode, JIS, etc.
  radicals: jsonb().$type<Radical[]>().default([]).notNull(), // Radical values
  misc: jsonb().$type<MiscInfo>(), // Miscellaneous info
  dictionaryReferences: jsonb()
    .$type<DictionaryReference[]>()
    .default([])
    .notNull(), // Dictionary references
  queryCodes: jsonb().$type<QueryCode[]>().default([]).notNull(), // Query codes (SKIP, Four Corner, etc.)
  readingsMeanings: jsonb()
    .$type<ReadingMeaningGroup[]>()
    .default([])
    .notNull(), // Readings and meanings
});

export const kanjiSchema = createSelectSchema(kanjis);

export type Kanji = z.infer<typeof kanjiSchema>;
