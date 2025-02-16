import { createRoute, z } from '@hono/zod-openapi';
import type { AppRoutes } from '../../types/app_context';
import { sentencesSchema } from './sentences.db';

const getSentence = createRoute({
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
          schema: sentencesSchema,
        },
      },
    },
  },
});

export const sentencesRoutes = {
  getSentence,
} as const satisfies AppRoutes;
