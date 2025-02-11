import type { Env } from 'hono';

export interface Context extends Env {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Variables: {};
}
