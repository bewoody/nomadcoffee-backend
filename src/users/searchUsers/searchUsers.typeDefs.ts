import { gql } from "apollo-server";

export default gql`
  type Query {
    searchUsers(keyword: String!, lastId: Int): [User]
  }
`;

export interface SearchUsersInput {
  keyword: string;
  lastId?: number;
}
