import { Hono } from 'hono';
import type { Context } from '../../types/context';
// import { createDatabase } from '../database';
import { createUserService } from './user.service';
import { createUserRepository } from './user.repository';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// Setup dependencies
// const db = createDatabase();
const userRepo = createUserRepository({});
const userService = createUserService(userRepo);

// Create a typed router
export const userRouter = new Hono<Context>();

userRouter.get('/:id', zValidator('param', z.string()), (c) => {
  const id = c.req.valid('param');
  userService.getUser(id);

  return c.json({ id });
});
