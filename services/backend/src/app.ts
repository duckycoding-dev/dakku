import { Hono } from 'hono';
import { errorHandler } from './utils/errors';

export const app = new Hono();

app.onError(errorHandler);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});
