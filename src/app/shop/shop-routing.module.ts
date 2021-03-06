import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IProductRequestFakeAPI } from '../assets/interfaces/product/product';
import { ShopBasketComponent } from './shop-basket/shop-basket.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopDiscountsComponent } from './shop-discounts/shop-discounts.component';
import { ShopLikedComponent } from './shop-liked/shop-liked.component';
import { ShopOrderComponent } from './shop-order/shop-order.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: ShopDiscountsComponent,
      },
      {
        path: 'products/:category',
        component: ShopProductsComponent,
      },
      {
        path: 'products/:category/:id/:name',
        component: ShopDetailsComponent,
      },
      {
        path: 'order',
        component: ShopOrderComponent,
      },
      {
        path: 'liked',
        component: ShopLikedComponent,
      },
      {
        path: 'basket',
        component: ShopBasketComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
