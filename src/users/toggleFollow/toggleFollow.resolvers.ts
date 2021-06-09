import { CoreOutput } from "../../shared/shared.typeDefs";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { ToggleFollowInput } from "./toggleFollow.typeDefs";

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: protectedResolver(
      async (
        _,
        { id }: ToggleFollowInput,
        { client, loggedInUser }
      ): Promise<CoreOutput> => {
        try {
          if (id === loggedInUser.id) {
            return {
              ok: false,
              error: "Cannot perform follow relation with self.",
            };
          }
          const alreadyFollowing = await client.user.findFirst({
            where: {
              id,
              followers: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          });
          if (alreadyFollowing) {
            await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                following: {
                  disconnect: {
                    id,
                  },
                },
              },
            });
          } else {
            await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                following: {
                  connect: {
                    id,
                  },
                },
              },
            });
          }
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
