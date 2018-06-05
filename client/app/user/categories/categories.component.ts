import { Input } from '@angular/core';
import { oCategory } from './../../models/category';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  errMsg: string;
  categories: oCategory.Category;

  @Input() category: string;

  constructor(private _catService: CategoryService) {}

  ngOnInit() {
    this._catService
      .getAll()
      .subscribe(
        c => (this.categories = c),
        err => (this.errMsg = err.message)
      );
  }
}
