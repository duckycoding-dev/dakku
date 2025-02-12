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
      return userRepository.getUser(id);
    },
    createUser: async (name) => {
      return userRepository.createUser(name);
    },
  };
};
