// import { createDatabase } from '../database';
import { createUserController } from './user.controller';
import { createUserService } from './user.service';
import { createUserRepository } from './user.repository';
import { createRouter } from '../../utils/create-app';

import { userRoutes } from './user.routes';
// Setup dependencies
// const db = createDatabase();
const userRepo = createUserRepository({});
const userService = createUserService(userRepo);
const userController = createUserController(userService);

// Create a typed router
const userRouter = createRouter()
  .basePath('/users')
  .openapi(userRoutes.getUser, userController.getUser)
  .openapi(userRoutes.createUser, userController.createUser);

export default userRouter;
