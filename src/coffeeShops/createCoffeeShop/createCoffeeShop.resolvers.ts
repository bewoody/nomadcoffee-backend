import { CoreOutput } from "../../shared/shared.typeDefs";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { extractCategories, extractPhotos } from "../coffeeShops.utils";
import { CreateCoffeeShopInput } from "./createCoffeeShop.typeDefs";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, category, latitude, longitude, photos }: CreateCoffeeShopInput,
        { client, loggedInUser }
      ): Promise<CoreOutput> => {
        try {
          const categoryObj = extractCategories(category);
          let photoObj = [];
          if (photos) {
            photoObj = await Promise.all(
              photos.map((photo: any) => extractPhotos(photo))
            );
          }
          await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(categoryObj.length > 0 && {
                categories: {
                  connectOrCreate: categoryObj,
                },
              }),
              ...(photoObj.length > 0 && {
                photos: {
                  createMany: {
                    data: photoObj,
                  },
                },
              }),
            },
          });
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