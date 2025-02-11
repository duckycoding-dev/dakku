// import type { Context } from 'hono';
// import type { UserService } from './user.service';

// export type UserController = {
//   getUser: (c: Context) => Promise<Response>;
//   createUser: (c: Context) => Promise<Response>;
//   // ... other methods
// };

// export const createUserController = (
//   userService: UserService,
// ): UserController => {
//   return {
//     getUser: async (c) => {
//       const id = c.param('id');
//       const user = await userService.getUserById(id);
//       return c.json({ success: true, data: user });
//     },
//     createUser: async (c) => {
//       const data = await c.req.json();
//       const user = await userService.createUser(data);
//       return c.json({ success: true, data: user }, 201);
//     },
//   };
// };
