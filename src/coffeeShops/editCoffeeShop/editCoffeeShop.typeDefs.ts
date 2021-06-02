import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      category: [String]
      latitude: String
      longitude: String
      photos: [Upload]
    ): MutationResponse!
  }
`;

export interface EditCoffeeShopInput {
  id: number;
  name?: string;
  categroy?: [string];
  latitude?: string;
  longitude?: string;
  photos?: [any];
}
