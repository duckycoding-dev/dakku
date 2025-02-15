import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { vocabulary } from '../vocabulary/vocabulary.db';
import type { Vocabulary } from './vocabulary.db';

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
      return res[0];
    },
  };
};
