export type UserRepository = {
  getUser: (id: string) => Promise<string>;
  // ... other methods
};

export const createUserRepository = (db: unknown): UserRepository => {
  return {
    getUser: async (id) => {
      return id;
    },
  };
};
