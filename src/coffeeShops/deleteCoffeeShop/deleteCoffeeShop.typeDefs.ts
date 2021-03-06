import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteCoffeeShop(id: Int!): MutationResponse!
  }
`;

export interface DeleteCoffeeShopInput {
  id: number;
}
