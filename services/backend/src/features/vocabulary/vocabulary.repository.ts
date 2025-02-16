import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { vocabulary } from '../vocabulary/vocabulary.db';
import { type Vocabulary, vocabularySchema } from './vocabulary.db';
import { formatZodError, nullsToUndefined } from 'utils/mapping/';
import { AppError } from 'utils/errors/';

export type VocabularyRepository = {
  getVocab: (id: number) => Promise<Vocabulary | undefined>;
  // ... other methods
};

export const createVocabularyRepository = (
  db: PostgresJsDatabase,
): VocabularyRepository => {
  return {
    getVocab: async (id) => {
      const res = await db
        .select()
        .from(vocabulary)
        .where(eq(vocabulary.id, id));
      if (res.length === 0) {
        return undefined;
      }
      const vocab = nullsToUndefined(res[0]);
      if (!vocab) {
        return undefined;
      }

      const parsed = vocabularySchema.safeParse(vocab);
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
