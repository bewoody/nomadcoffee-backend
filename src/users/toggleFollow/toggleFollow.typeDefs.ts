import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleFollow(id: Int!): MutationResponse!
  }
`;

export interface ToggleFollowInput {
  id: number;
}
