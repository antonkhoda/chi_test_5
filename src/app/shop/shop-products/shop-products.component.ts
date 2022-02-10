import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductRequestFakeAPI } from 'src/app/assets/interfaces/product/product';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';
import { LikedService } from 'src/app/assets/services/liked/liked.service';
import { BasketService } from 'src/app/assets/services/basket/basket.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {
  public products: Array<IProductRequestFakeAPI> = [];
  public liked: Array<number | string | undefined> = [];
  public basket: Array<number | string | undefined> = [];
  private subscriptions: Subscription = new Subscription();
  private currentCategory: string = '';

  constructor(
    private productService: ProductService,
    private likedService: LikedService,
    private basketService: BasketService,
    private toast: HotToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentCategory = this.activatedRoute.snapshot.paramMap.get('category') as string;
          this.loadProducts(this.currentCategory as string);
        }
      })
    );
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.loadProducts(this.currentCategory);
    this.liked = this.likedService.likedState.likedArr;
    this.basket = this.basketService.basketState.basketArr?.map(val => val.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadProducts(name: string): void {
    this.products = this.productService.filterProductsByCategory(name);
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
