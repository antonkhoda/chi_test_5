import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'discounts',
        component: AdminDiscountsComponent,
      },
      {
        path: 'category',
        component: AdminCategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
