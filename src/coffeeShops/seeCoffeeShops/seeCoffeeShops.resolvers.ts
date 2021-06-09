import { Resolvers } from "../../types";
import { SeeCoffeeShopsInput } from "./seeCoffeeShops.typeDefs";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { lastId }: SeeCoffeeShopsInput, { client }) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        include: {
          photos: {
            select: { url: true },
          },
          categories: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
  },
};

export default resolvers;
