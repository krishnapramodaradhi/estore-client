import { Observable } from "rxjs/Observable";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { oProduct } from "../../models/product";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-manage-products",
  templateUrl: "./manage-products.component.html",
  styleUrls: ["./manage-products.component.scss"]
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products: oProduct.Product[];
  filteredProducts: oProduct.Product[];
  subscription: Subscription;

  constructor(private _productService: ProductService) {}

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }

  ngOnInit() {
    this.subscription = this._productService
      .getAll()
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
