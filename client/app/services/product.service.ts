import { oProduct } from "./../models/product";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
  private _BASE_URI = "http://localhost:8765/product-service/products";

  constructor(private _http: HttpClient) {}

  create(product: oProduct.Product): Observable<oProduct.CUDProduct> {
    return this._http.post<oProduct.CUDProduct>(
      this._BASE_URI + "/",
      product
    );
  }

  getAll(): Observable<oProduct.Product[]> {
    return this._http.get<oProduct.Product[]>(
      this._BASE_URI + "/"
    );
  }

  get(id: string): Observable<oProduct.Product> {
    return this._http.get<oProduct.Product>(this._BASE_URI + "/" + id);
  }

  update(
    id: string,
    product: oProduct.Product
  ): Observable<oProduct.CUDProduct> {
    return this._http.patch<oProduct.CUDProduct>(
      this._BASE_URI + "/" + id,
      product
    );
  }

  delete(id: string): Observable<oProduct.CUDProduct> {
    return this._http.delete<oProduct.CUDProduct>(
      this._BASE_URI + "/delete/" + id
    );
  }
}
