import type { AppType } from './app';
import { hc } from 'hono/client';

// https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended

// this is a trick to calculate the type when compiling
const client = hc<AppType>('http://localhost:3000');
export type Client = typeof client;
export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);
