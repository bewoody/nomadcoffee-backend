import * as bcrypt from "bcrypt";
import { CoreOutput } from "../../shared/shared.typeDefs";
import { Resolvers } from "../../types";
import { CreateAccountInput } from "./createAccout.typeDefs";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password }: CreateAccountInput,
      { client }
    ): Promise<CoreOutput> => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "This username/email is already taken.",
          };
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return the user
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create accout.",
        };
      }
    },
  },
};

export default resolvers;
