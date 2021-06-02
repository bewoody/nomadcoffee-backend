import { Resolvers } from "../../types";
import { SeeCoffeeShopInput } from "./seeCoffeeShop.typeDefs";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop: (_, { id }: SeeCoffeeShopInput, { client }) =>
      client.coffeeShop.findUnique({
        where: { id },
        include: {
          categories: {
            select: {
              name: true,
            },
          },
          photos: {
            select: {
              url: true,
            },
          },
        },
      }),
  },
};

export default resolvers;
