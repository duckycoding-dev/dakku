// import { createDatabase } from '../database';
import { createUserController, type UserController } from './user.controller';
import { createUserService } from './user.service';
import { createUserRepository } from './user.repository';
import { createRouter, popoulateRouter } from '../../utils/create-app';

import { userRoutes } from './user.routes';
// Setup dependencies
// const db = createDatabase();
const userRepo = createUserRepository({});
const userService = createUserService(userRepo);
const userController = createUserController(userService);

// Create a typed router
export const userRouter = createRouter('/users');

popoulateRouter<UserController>(userRouter, userRoutes, userController);
