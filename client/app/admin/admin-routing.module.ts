import { UserFormComponent } from './user-form/user-form.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AuthGuard } from './../guards/auth.guard';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'manage-products/new',
        component: ProductFormComponent
      },
      {
        path: 'manage-products/:id',
        component: ProductFormComponent
      },
      {
        path: 'manage-products',
        component: ManageProductsComponent
      },
      {
        path: 'manage-users/:id',
        component: UserFormComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
