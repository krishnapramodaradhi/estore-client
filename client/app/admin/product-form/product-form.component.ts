import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../services/product.service";
import { oCategory } from "./../../models/category";
import { Observable } from "rxjs/Observable";
import { CategoryService } from "./../../services/category.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { oProduct } from "../../models/product";
import "rxjs/add/operator/take";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  id: string;
  alertMessage: string;
  alertType: string;

  form: FormGroup;
  categories$: Observable<oCategory.Category>;
  product: oProduct.Product;
  sub: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _catService: CategoryService,
    private _productService: ProductService
  ) {
    this.createFrom();
  }

  public createFrom(): void {
    this.form = this._fb.group({
      title: "",
      price: "",
      category: "",
      imageUrl: ""
    });
  }

  public createOrUpdateProduct() {
    if (this.id) {
      this._productService.update(this.id, this.form.value).subscribe();
    } else {
      this._productService.create(this.form.value).subscribe();
    }
    setTimeout(() => {
      return this._router.navigate(["/admin/manage-products"]);
    }, 1000);
  }

  getProduct(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    if (this.id) {
      this._productService
        .get(this.id)
        .take(1)
        .subscribe(p => {
          this.product = p;
          this.form.setValue({
            title: this.product.title,
            price: this.product.price,
            category: this.product.category,
            imageUrl: this.product.imageUrl
          });
        });
    }
  }

  deleteProduct() {
    this._productService.delete(this.id).subscribe();
    setTimeout(() => {
      return this._router.navigate(["/admin/manage-products"]);
    }, 1000);
  }

  async ngOnInit() {
    this.categories$ = await this._catService.getAll();
    this.getProduct();
  }
}
