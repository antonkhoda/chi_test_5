import { Component, OnInit } from '@angular/core';
import { IProductRequestFakeAPI } from 'src/app/assets/interfaces/product/product';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';
import { LikedService } from 'src/app/assets/services/liked/liked.service';
import { BasketService } from 'src/app/assets/services/basket/basket.service';

@Component({
  selector: 'app-shop-discounts',
  templateUrl: './shop-discounts.component.html',
  styleUrls: ['./shop-discounts.component.scss'],
})
export class ShopDiscountsComponent implements OnInit {
  public products: Array<IProductRequestFakeAPI> = [];
  public liked: Array<number | string | undefined> = [];
  public basket: Array<number | string | undefined> = [];

  constructor(
    private productService: ProductService,
    private likedService: LikedService,
    private basketService: BasketService,
    private toast: HotToastService
  )
  {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.products = this.productService.productsState;  
    this.liked = this.likedService.likedState.likedArr;
    this.basket = this.basketService.basketState.basketArr?.map(val => val.id);
  }
  
  public addToLiked(productId: number): void {
    this.likedService.addOrRemoveFromLiked(productId)
      .then(() => this.toast.success('Liked successfully updated'))
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public addToBasket(productId: number): void {
    this.basketService.addOrRemoveFromBasket(productId)
      .then(() => this.toast.success('Basket successfully updated'))
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }
}
