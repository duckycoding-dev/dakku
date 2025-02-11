import { pgTable, text } from 'drizzle-orm/pg-core';

export const vocabulary = pgTable('vocabulary', {
  id: text('id').primaryKey(), // Word (Kanji if available, else Kana)
  reading: text('reading'),
  meaning: text('meaning'),
});
