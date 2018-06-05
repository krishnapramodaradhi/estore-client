import { oCategory } from './../models/category';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  private _BASE_URI = "http://localhost:8765/category-service/category";

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<oCategory.Category> {
    return this._http.get<oCategory.Category>(this._BASE_URI + '/');
  }

}
