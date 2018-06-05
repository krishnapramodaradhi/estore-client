import { CartService } from "./../../services/cart.service";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { _throw } from 'rxjs/observable/throw';
import { ProductService } from "./../../services/product.service";
import { Component, OnInit } from "@angular/core";
import { oProduct } from "../../models/product";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: oProduct.Product[] = [];
  filteredProducts: oProduct.Product[];
  category: string;
  errMsg: string;

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cartService: CartService
  ) {}

  addToCart(product: oProduct.Product) {
    this._cartService.addToCart(product);
  }

  ngOnInit() {
    this._product
      .getAll()
      .switchMap(product => {
        this.products = product;
        return this._route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get("category");

        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      }, err => this.errMsg = err.message);
  }
}
