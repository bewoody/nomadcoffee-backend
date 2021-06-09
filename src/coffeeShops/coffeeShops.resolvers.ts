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
  CoffeeShop: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
};

export default resolvers;
