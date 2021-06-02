import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      category: [String]!
      latitude: String
      longitude: String
      photos: [Upload]
    ): MutationResponse!
  }
`;

export interface CreateCoffeeShopInput {
  name: string;
  category: [string];
  latitude?: string;
  longitude?: string;
  photos?: [any];
}
