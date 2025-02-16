import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { sentences } from '../sentences/sentences.db';
import { type Sentence, sentencesSchema } from './sentences.db';
import { formatZodError } from 'utils/mapping/';
import { AppError } from 'utils/errors/';

export type SentencesRepository = {
  getSentence: (id: number) => Promise<Sentence | undefined>;
  // ... other methods
};

export const createSentencesRepository = (
  db: PostgresJsDatabase,
): SentencesRepository => {
  return {
    getSentence: async (id) => {
      const res = await db.select().from(sentences).where(eq(sentences.id, id));
      if (res.length === 0) {
        return undefined;
      }
      const vocab = res[0];
      if (!vocab) {
        return undefined;
      }

      const parsed = sentencesSchema.safeParse(vocab);
      if (parsed.success) {
        return parsed.data;
      }
      console.log(parsed.error);
      throw new AppError('VALIDATION', {
        message: formatZodError(parsed.error),
        cause: parsed.data,
      });
    },
  };
};
