export type UserRepository = {
  getUser: (id: string) => Promise<string>;
  createUser: (name: string) => Promise<string>;
  // ... other methods
};

export const createUserRepository = (db: unknown): UserRepository => {
  return {
    getUser: async (id) => {
      console.log(db);
      return id;
    },
    createUser: async (name) => {
      console.log(db);
      return name;
    },
  };
};
