import { Component, OnInit } from '@angular/core';
import { IProductResponseFakeAPI } from 'src/app/assets/interfaces/product/product';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';
import { LikedService } from 'src/app/assets/services/liked/liked.service';
import { BasketService } from 'src/app/assets/services/basket/basket.service';

@Component({
  selector: 'app-shop-basket',
  templateUrl: './shop-basket.component.html',
  styleUrls: ['./shop-basket.component.scss'],
})
export class ShopBasketComponent implements OnInit {
  public totalPrice: number = 0;
  public products: Array<IProductResponseFakeAPI> = [];
  public liked: Array<number | string | undefined> = [];
  public basket: Array<number | string | undefined> = [];

  constructor(
    private productService: ProductService,
    private likedService: LikedService,
    private basketService: BasketService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.products = this.productService.filterModProductsByState(this.basketService.basketState.basketArr);
    this.totalPrice = this.basketService.calculateFullPrice(this.products);
    this.liked = this.likedService.likedState.likedArr;
  }

  public increment(productId: number, productCount: number): void {
    this.basketService.changeCount(productId, ++productCount)
    .catch((error) => {
      this.toast.error(`ERROR: ${error}`);
    });
  }

  public decrement(productId: number, productCount: number): void {
    if(productCount > 1){
      this.basketService.changeCount(productId, --productCount)
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
    }
  }

  public deleteFromBasket(productId: number): void {
    this.basketService.addOrRemoveFromBasket(productId)
      .then(() => this.toast.success('Basket successfully updated'))
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

}
