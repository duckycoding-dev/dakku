import { sql } from 'drizzle-orm';
import { pgTable, integer, jsonb, text } from 'drizzle-orm/pg-core';

// // JMdict Dictionary Table
// export const vocabulary = pgTable('vocabulary', {
//   id: integer('id').primaryKey(), // Unique entry ID from ent_seq
//   kanji:
//     jsonb('kanji').$type<
//       { keb: string; ke_inf?: string[]; ke_pri?: string[] }[]
//     >(),
//   readings:
//     jsonb('readings').$type<
//       { reb: string; re_inf?: string[]; re_pri?: string[] }[]
//     >(),
//   meanings: jsonb('meanings').$type<
//     {
//       pos?: string[];
//       field?: string[];
//       misc?: string[];
//       dial?: string[];
//       gloss: { text: string; lang?: string }[];
//     }[]
//   >(),
// });

// Database schema
export const vocabulary = pgTable('vocabulary', {
  id: integer('id').primaryKey(), // from ent_seq
  kanji: jsonb('kanji').notNull().default([]).array(), // Array of kanji elements
  readings: jsonb('readings').notNull().array(), // Array of reading elements
  senses: jsonb('senses').notNull().array(), // Array of sense elements
  tags: text('tags').array(), // Searchable tags compiled from pos, field, misc
  priority: text('priority').array(), // Combined priorities from kanji and readings
  created_at: integer('created_at')
    .notNull()
    .default(sql`extract(epoch from now())`),
  updated_at: integer('updated_at')
    .notNull()
    .default(sql`extract(epoch from now())`),
});
