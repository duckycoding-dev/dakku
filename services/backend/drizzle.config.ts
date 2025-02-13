import { defineConfig } from 'drizzle-kit';
import env from './src/utils/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/features/kanji/kanji.db.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'jdbc:postgresql://localhost:5432/dakku',
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    password: env.POSTGRES_PASSWORD,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
  },
});
