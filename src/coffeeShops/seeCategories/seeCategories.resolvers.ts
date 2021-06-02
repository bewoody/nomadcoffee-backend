import { Resolvers } from "../../types";
import { SeeCategoriesInput } from "./seeCategories.typeDefs";

const resolvers: Resolvers = {
  Query: {
    seeCategories: (_, { lastId }: SeeCategoriesInput, { client }) =>
      client.category.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
