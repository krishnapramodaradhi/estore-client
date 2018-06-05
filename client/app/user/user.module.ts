import { SharedModule } from './../shared/shared.module';
import { CategoryService } from './../services/category.service';
import { UserRoutingModule } from "./user-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./categories/categories.component";
import { ProductsComponent } from "./products/products.component";
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@NgModule({
  imports: [CommonModule, UserRoutingModule, SharedModule, FormsModule],
  declarations: [
    CategoriesComponent,
    ProductsComponent
  ],
  providers: [CategoryService, CartService]
})
export class UserModule {}
