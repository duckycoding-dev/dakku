import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { kanjis } from '../kanji/kanji.db';
import { eq } from 'drizzle-orm';

export type UserRepository = {
  getUser: (id: string) => Promise<string | undefined>;
  createUser: (name: string) => Promise<string>;
  // ... other methods
};

export const createUserRepository = (
  db: PostgresJsDatabase,
): UserRepository => {
  return {
    getUser: async (id) => {
      const res = await db
        .select({
          id: kanjis.id,
        })
        .from(kanjis)
        .where(eq(kanjis.id, id));
      return res[0]?.id;
    },
    createUser: async (name) => {
      console.log(db);
      return name;
    },
  };
};
