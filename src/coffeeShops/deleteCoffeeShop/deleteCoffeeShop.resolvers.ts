import { CoreOutput } from "../../shared/shared.typeDefs";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { DeleteCoffeeShopInput } from "./deleteCoffeeShop.typeDefs";

const resolvers: Resolvers = {
  Mutation: {
    deleteCoffeeShop: protectedResolver(
      async (
        _,
        { id }: DeleteCoffeeShopInput,
        { loggedInUser, client }
      ): Promise<CoreOutput> => {
        try {
          const shop = await client.coffeeShop.findUnique({ where: { id } });
          if (!shop) {
            return {
              ok: false,
              error: "CoffeeShop not found.",
            };
          }
          if (loggedInUser.id !== shop.userId) {
            return {
              ok: false,
              error: "You can't delete a coffee shop that you don't own",
            };
          }
          await client.coffeeShop.delete({ where: { id } });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: `${error}`,
          };
        }
      }
    ),
  },
};

export default resolvers;
