import { gql } from "apollo-server";

export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
    coffeeShopId: Int
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      category: String!
      latitude: String
      longitude: String
      photos: [Upload]
    ): CreateCoffeeShopResult!
  }
`;

export interface CreateCoffeeShopInput {
  name: string;
  category: string;
  latitude?: string;
  longitude?: string;
  photos?: [any];
}

export interface CreateCoffeeShopOutput {
  ok: boolean;
  error?: string;
  coffeeShopId?: number;
}
