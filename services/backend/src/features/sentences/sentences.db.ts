import { serial, pgTable, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey(),
  japanese: text('japanese'),
  english: text('english'),
});

export const sentencesSchema = createSelectSchema(sentences);
export type Sentence = Zod.infer<typeof sentencesSchema>;
