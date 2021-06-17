import { Resolvers } from "../../types";
import { SearchCoffeeShopInput } from "./searchCoffeeShop.typeDefs";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShop: (_, { keyword }: SearchCoffeeShopInput, { client }) =>
      client.coffeeShop.findMany({ where: { name: { startsWith: keyword } } }),
  },
};

export default resolvers;
