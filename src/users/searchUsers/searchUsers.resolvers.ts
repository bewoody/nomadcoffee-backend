import { Resolvers } from "../../types";
import { SearchUsersInput } from "./searchUsers.typeDefs";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (
      _,
      { keyword, lastId }: SearchUsersInput,
      { client }
    ) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLocaleLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return users;
    },
  },
};

export default resolvers;
