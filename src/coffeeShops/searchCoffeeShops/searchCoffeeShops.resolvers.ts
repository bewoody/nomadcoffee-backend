import { Resolvers } from "../../types";
import { SearchCoffeeShopsInput } from "./searchCoffeeShops.typeDefs";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShops: (_, { keyword }: SearchCoffeeShopsInput, { client }) =>
      client.coffeeShop.findMany({
        where: { name: { startsWith: keyword } },
        include: { photos: { select: { url: true } } },
      }),
  },
};

export default resolvers;
