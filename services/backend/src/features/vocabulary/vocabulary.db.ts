import { pgTable, integer, jsonb, text } from 'drizzle-orm/pg-core';
import {
  Fields,
  MiscInfos,
  PartsOfSpeech,
  Priorities,
  type KanjiElement,
  type ReadingElement,
  type Sense,
} from './vocabulary.types';
import { createSelectSchema } from 'drizzle-zod';

// JMdict Dictionary Database schema
export const vocabulary = pgTable('vocabulary', {
  id: integer().primaryKey(), // from ent_seq
  kanji: jsonb().$type<KanjiElement[]>().default([]).notNull(), // Array of kanji elements (if available)
  readings: jsonb().$type<ReadingElement[]>().default([]).notNull(), // Array of reading elements
  senses: jsonb().$type<Sense[]>().default([]).notNull(), // Array of sense elements
  tags: text({
    enum: [...Fields, ...PartsOfSpeech, ...MiscInfos],
  })
    .array()
    .notNull()
    .default([]), // Searchable tags compiled from pos, field, misc
  priorities: text({
    enum: [...Priorities],
  })
    .array()
    .notNull()
    .default([]), // Combined priorities from kanji and readings
});

// No need for validation schemas as we are not inserting data into this table

export const vocabularySchema = createSelectSchema(vocabulary);
export type Vocabulary = Zod.infer<typeof vocabularySchema>;
