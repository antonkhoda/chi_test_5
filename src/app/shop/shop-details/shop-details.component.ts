import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductRequestFakeAPI } from 'src/app/assets/interfaces/product/product';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';
import { LikedService } from 'src/app/assets/services/liked/liked.service';
import { BasketService } from 'src/app/assets/services/basket/basket.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  public currentProduct: IProductRequestFakeAPI = <IProductRequestFakeAPI>{};
  public liked: Array<number | string | undefined> = [];
  public basket: Array<number | string | undefined> = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private likedService: LikedService,
    private basketService: BasketService,
    private toast: HotToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.takeCurrentProduct();
    this.liked = this.likedService.likedState.likedArr;
    this.basket = this.basketService.basketState.basketArr?.map(val => val.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private takeCurrentProduct(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        const id = Number.parseInt(params['id']);
        let product = this.productService.getSingleProduct(id);
        if (product) {
          this.currentProduct = product;
        }
      })
    );
  }

  public addToLiked(): void {
    this.likedService.addOrRemoveFromLiked(this.currentProduct.id)
    .then(() => this.toast.success('Liked successfully updated'))
    .catch((error) => {
      this.toast.error(`ERROR: ${error}`);
    });
  }

  public addToBasket(): void {
    this.basketService.addOrRemoveFromBasket(this.currentProduct.id)
      .then(() => this.toast.success('Basket successfully updated'))
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

}
