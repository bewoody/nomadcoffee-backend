import { Resolvers } from "../../types";
import { SeeCategoryInput } from "./seeCategory.typeDefs";

const resolvers: Resolvers = {
  Query: {
    seeCategory: (_, { name, lastId }: SeeCategoryInput, { client }) =>
      client.category
        .findUnique({
          where: {
            name,
          },
        })
        .shops({
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};

export default resolvers;
