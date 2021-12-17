import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { SharedModule } from '../shared/shared.module';
import { AdminCategoryComponent } from './admin-category/admin-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    AdminDiscountsComponent,
    AdminCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
