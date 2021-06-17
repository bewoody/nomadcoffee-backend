import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCoffeeShop(keyword: String!): [CoffeeShop]
  }
`;

export interface SearchCoffeeShopInput {
  keyword: string;
}
