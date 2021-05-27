import { gql } from "apollo-server";
import { CoreOutput } from "../../shared/shared.typeDefs";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginOutput extends CoreOutput {
  token?: string;
}
