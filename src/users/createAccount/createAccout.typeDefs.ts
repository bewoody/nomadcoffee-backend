import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      password: String!
    ): MutationResponse!
  }
`;

export interface CreateAccountInput {
  username: string;
  email: string;
  name: string;
  location?: string;
  password: string;
}
