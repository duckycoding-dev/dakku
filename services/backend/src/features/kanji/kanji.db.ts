import { pgTable, text, integer } from 'drizzle-orm/pg-core';

export const kanji = pgTable('kanji', {
  id: text('id').primaryKey(), // Kanji character
  meaning: text('meaning'),
  onyomi: text('onyomi').array(),
  kunyomi: text('kunyomi').array(),
  jlpt: integer('jlpt'),
  frequency: integer('frequency'),
  strokes: integer('strokes'),
});
