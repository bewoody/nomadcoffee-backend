import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Category: {
    totalShops: ({ name }, _, { client }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      }),
  },
};

export default resolvers;
