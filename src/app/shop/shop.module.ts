import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { ShopBasketComponent } from './shop-basket/shop-basket.component';
import { ShopLikedComponent } from './shop-liked/shop-liked.component';
import { ShopDiscountsComponent } from './shop-discounts/shop-discounts.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopOrderComponent } from './shop-order/shop-order.component';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [
    ShopComponent,
    ShopProductsComponent,
    ShopBasketComponent,
    ShopLikedComponent,
    ShopDiscountsComponent,
    ShopDetailsComponent,
    ShopOrderComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule, NgxMaskModule],
})
export class ShopModule {}
