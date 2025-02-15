import { pgTable, integer, jsonb, text } from 'drizzle-orm/pg-core';
import type {
  KanjiElement,
  KanjiTag,
  Priority,
  ReadingElement,
  Sense,
} from './vocabulary.types';

// JMdict Dictionary Database schema
export const vocabulary = pgTable('vocabulary', {
  id: integer().primaryKey(), // from ent_seq
  kanji: jsonb().$type<KanjiElement[] | undefined>().default(undefined), // Array of kanji elements (if available)
  readings: jsonb().$type<ReadingElement[]>().notNull(), // Array of reading elements
  senses: jsonb().$type<Sense[]>().notNull(), // Array of sense elements
  tags: text().$type<KanjiTag[]>().default([]), // Searchable tags compiled from pos, field, misc
  priority: text().$type<Priority[]>().default([]), // Combined priorities from kanji and readings
});

// No need for validation schemas as we are not inserting data into this table
