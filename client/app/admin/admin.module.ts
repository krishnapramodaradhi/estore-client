import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageProductsComponent } from "./manage-products/manage-products.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { SharedModule } from "../shared/shared.module";
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    ManageProductsComponent,
    ProductFormComponent,
    ManageUsersComponent,
    UserFormComponent
  ]
})
export class AdminModule {}
