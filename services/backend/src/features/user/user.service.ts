import { AppError } from '../../utils/errors';
import type { UserRepository } from './user.repository';

export type UserService = {
  getUser: (id: string) => Promise<string>;
  createUser: (name: string) => Promise<string>;
  // ... other methods
};

export const createUserService = (
  userRepository: UserRepository,
): UserService => {
  return {
    getUser: async (id) => {
      const user = await userRepository.getUser(id);
      if (!user) {
        throw new AppError('NOT_FOUND', {
          message: 'User not found',
        });
      }
      return user;
    },
    createUser: async (name) => {
      return userRepository.createUser(name);
    },
  };
};
