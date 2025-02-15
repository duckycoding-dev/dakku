import { pgTable, integer, jsonb, text } from 'drizzle-orm/pg-core';
import type {
  KanjiElement,
  KanjiTag,
  Priority,
  ReadingElement,
  Sense,
} from './vocabulary.types';
import { createSelectSchema } from 'drizzle-zod';

// JMdict Dictionary Database schema
export const vocabulary = pgTable('vocabulary', {
  id: integer().primaryKey(), // from ent_seq
  kanji: jsonb().$type<KanjiElement[] | undefined>().default(undefined).array(), // Array of kanji elements (if available)
  readings: jsonb().$type<ReadingElement[]>().array(), // Array of reading elements
  senses: jsonb().$type<Sense[]>().array(), // Array of sense elements
  tags: text().$type<KanjiTag[]>().default([]).array(), // Searchable tags compiled from pos, field, misc
  priorities: text().$type<Priority[]>().default([]).array(), // Combined priorities from kanji and readings
});

// No need for validation schemas as we are not inserting data into this table

export const vocabularySchema = createSelectSchema(vocabulary);
export type Vocabulary = Zod.infer<typeof vocabularySchema>;
