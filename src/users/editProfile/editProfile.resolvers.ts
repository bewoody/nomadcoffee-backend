import { createWriteStream } from "fs";
import * as bcrypt from "bcrypt";
import { CoreOutput } from "../../shared/shared.typeDefs";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL,
          githubUsername,
        },
        { client, loggedInUser }
      ): Promise<CoreOutput> => {
        let avatarUrl = null;
        if (avatarURL) {
          avatarUrl = await uploadToS3(avatarURL, loggedInUser.id, "avatars");
        }
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            name,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatarURL: avatarUrl }),
            githubUsername,
          },
        });
        if (updatedUser.id) {
          return { ok: true };
        } else {
          return {
            ok: false,
            error: "Could not update profile",
          };
        }
      }
    ),
  },
};

export default resolvers;
