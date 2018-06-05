export namespace oProduct {
  export interface CUDProduct {
    message: string;
    data: Product;
  }

  export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    quantity: number;
  }
}
