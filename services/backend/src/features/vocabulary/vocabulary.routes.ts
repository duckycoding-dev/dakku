import { createRoute, z } from '@hono/zod-openapi';
import type { AppRoutes } from '../../types/app_context';
import { vocabularySchema } from './vocabulary.db';

const getVocab = createRoute({
  path: '/:id',
  method: 'get',
  request: {
    params: z.object({ id: z.coerce.number() }),
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: vocabularySchema,
        },
      },
    },
  },
});

export const vocabularyRoutes = {
  getVocab,
} as const satisfies AppRoutes;
