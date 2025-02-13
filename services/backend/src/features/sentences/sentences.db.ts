import { serial, pgTable, text } from 'drizzle-orm/pg-core';

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey(),
  japanese: text('japanese'),
  english: text('english'),
});
