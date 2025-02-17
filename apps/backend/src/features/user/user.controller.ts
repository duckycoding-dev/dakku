import type { UserService } from './user.service';
import { userRoutes } from './user.routes';
import type { AppRouteHandler } from '../../types/app_context';

export type UserController = {
  getUser: AppRouteHandler<typeof userRoutes.getUser>;
  createUser: AppRouteHandler<typeof userRoutes.createUser>;
  // ... other methods
};

export const createUserController = (
  userService: UserService,
): UserController => {
  return {
    getUser: async (c) => {
      const { id } = c.req.valid('param');
      const result = await userService.getUser(id);
      return c.json({ id: result });
    },
    createUser: async (c) => {
      const { name } = c.req.valid('json');
      const result = await userService.createUser(name);
      return c.json({ name: result });
    },
  };
};
