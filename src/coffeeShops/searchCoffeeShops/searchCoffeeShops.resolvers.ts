import { Resolvers } from "../../types";
import { SearchCoffeeShopsInput } from "./searchCoffeeShops.typeDefs";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShops: (_, { keyword }: SearchCoffeeShopsInput, { client }) =>
      client.coffeeShop.findMany({
        where: {
          OR: [
            { name: { contains: keyword } },
            {
              categories: {
                some: {
                  name: {
                    contains: keyword,
                  },
                },
              },
            },
          ],
        },
        include: {
          photos: {
            select: {
              url: true,
            },
          },
          categories: {
            select: {
              name: true,
            },
          },
        },
      }),
  },
};

export default resolvers;
