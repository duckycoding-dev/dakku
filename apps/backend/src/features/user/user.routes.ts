import { createRoute, z } from '@hono/zod-openapi';
import type { AppRoutes } from '../../types/app_context';

const getUser = createRoute({
  path: '/:id',
  method: 'get',
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: z.object({ id: z.string() }),
        },
      },
    },
  },
});

const createUser = createRoute({
  path: '/',
  method: 'post',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ name: z.string() }),
        },
      },
      description: 'Create a new user',
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: z.object({ name: z.string() }),
        },
      },
    },
  },
});
const updateUser = createRoute({
  path: '/',
  method: 'put',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ name: z.string() }),
        },
      },
      description: 'Create a new user',
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: z.object({ name: z.string() }),
        },
      },
    },
  },
});

export const userRoutes = {
  getUser,
  createUser,
  updateUser,
} as const satisfies AppRoutes;
