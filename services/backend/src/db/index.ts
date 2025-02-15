// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import env from '../utils/env';

const postgresClient = postgres({
  database: env.POSTGRES_DB,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  port: env.POSTGRES_PORT,
  host: env.POSTGRES_HOST,
});
export const db = drizzle({ client: postgresClient, casing: 'snake_case' });
