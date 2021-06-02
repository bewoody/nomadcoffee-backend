import { CoreOutput } from "../../shared/shared.typeDefs";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { extractCategories, extractPhotos } from "../coffeeShops.utils";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, category, latitude, longitude, photos },
        { client, loggedInUser }
      ): Promise<CoreOutput> => {
        try {
          let categoryObjs = [];
          let photoObjs = [];
          const oldCoffeeShop = await client.coffeeShop.findFirst({
            where: {
              id,
            },
            include: {
              categories: {
                select: {
                  name: true,
                },
              },
              photos: {
                select: {
                  id: true,
                },
              },
            },
          });
          if (!oldCoffeeShop) {
            return {
              ok: false,
              error: "CoffeeShop not found.",
            };
          } else if (oldCoffeeShop.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "Not authorized.",
            };
          }
          if (category) {
            categoryObjs = extractCategories(category);
          }
          if (photos) {
            photoObjs = await Promise.all(
              photos.map((photo: any) => extractPhotos(photo))
            );
          }
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(categoryObjs.length > 0 && {
                categories: {
                  disconnect: oldCoffeeShop.categories,
                  connectOrCreate: categoryObjs,
                },
              }),
              ...(photoObjs.length > 0 && {
                photos: {
                  createMany: {
                    data: photoObjs,
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
