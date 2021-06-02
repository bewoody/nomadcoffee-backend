import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCoffeeShops(lastId: Int): [CoffeeShop]
  }
`;

export interface SeeCoffeeShopsInput {
  lastId?: number;
}
