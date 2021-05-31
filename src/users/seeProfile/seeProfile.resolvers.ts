import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { UsernameInput } from "./seeProfile.typeDefs";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver(
      (_, { username }: UsernameInput, { client }) =>
        client.user.findUnique({
          where: { username },
          include: { followers: true, following: true },
        })
    ),
  },
};

export default resolvers;
