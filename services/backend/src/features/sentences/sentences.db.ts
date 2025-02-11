import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const sentences = pgTable('sentences', {
  id: integer('id').primaryKey(),
  japanese: text('japanese'),
  english: text('english'),
});
