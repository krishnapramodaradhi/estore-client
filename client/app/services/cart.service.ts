import { oCart } from "./../models/cart";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { oProduct } from "../models/product";

@Injectable()
export class CartService {
  private _base_uri = "http://localhost:7887/api/cart";

  constructor(private _http: HttpClient) { }

  private create(productId, product: oProduct.Product): Observable<oCart.Cart> {
    return this._http.post<oCart.Cart>(this._base_uri + "/createCart", {
      dateCreated: new Date().getTime(),
      product: {
        _id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl
      }
    });
  }

  private getCart(id): Observable<oCart.Cart> {
    return this._http.get<oCart.Cart>(this._base_uri + "/" + id);
  }

  private updateProduct(cart: oCart.Cart, prod: oProduct.Product) {
    return this._http.patch<oCart.Cart>(this._base_uri + "/" + cart._id, {
      product: cart.product.push()
    });
  }

  private updateQuantity(id: string, product: oProduct.Product): Observable<oCart.Cart> {
    console.log(id + ' ' + JSON.stringify(product.quantity));
    return this._http.patch<oCart.Cart>(this._base_uri + "/" + id, {
      product: {
        quantity: product.quantity + 1
      }
    });
  }

  private getOrCreateCartId(productId, product) {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }

    this.create(productId, product).subscribe(data => {
      localStorage.setItem("cartId", data._id);
      return data._id;
    });
  }

  addToCart(product: oProduct.Product) {
    const cartId = this.getOrCreateCartId(product.id, product);
    this.getCart(cartId).subscribe(cart => {
      for (const p of cart.product) {
        if (p.id === product.id) {
          this.updateQuantity(cart._id, p).subscribe(data => console.log(data), err => console.log(err));
          //  console.log(p);
        }
      }
    });
  }
}
