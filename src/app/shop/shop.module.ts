import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { ShopBasketComponent } from './shop-basket/shop-basket.component';
import { ShopLikedComponent } from './shop-liked/shop-liked.component';
import { ShopDiscountsComponent } from './shop-discounts/shop-discounts.component';

@NgModule({
  declarations: [
    ShopComponent,
    ShopProductsComponent,
    ShopBasketComponent,
    ShopLikedComponent,
    ShopDiscountsComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }

