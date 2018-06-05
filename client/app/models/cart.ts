import { oProduct } from "./product";

export namespace oCart {
  export interface Cart {
    _id: string;
    dateCreated: string;
    product: Array<oProduct.Product>;
  }
}
