import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponseFakeAPI } from 'src/app/assets/interfaces/product/product';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { UserService } from 'src/app/assets/services/user/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {
  public products: Array<any> = [];
  private subscriptions: Subscription = new Subscription();
  public currentUser!: IUser;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private toast: HotToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const categoryName =
            this.activatedRoute.snapshot.paramMap.get('category');
          this.loadProducts(categoryName as string);
        }
      })
    );
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadProducts(name: string): void {
    this.categoryService
      .getAllProductsByCategoryFakeAPI(name)
      .then((res) => res.json())
      .then((json) => {
        this.products = json;
        this.products.forEach((element) => {
          element.liked =
            this.currentUser.liked.indexOf(element.id) < 0 ? false : true;
          element.basket = this.currentUser.basket.filter(
            (value) => value.id === element.id
          ).length
            ? true
            : false;
        });
      });
  }

  public addToBasket(product: IProductResponseFakeAPI): void {
    const currentItem = this.currentUser.basket.filter(
      (value) => value.id == product.id
    );
    const index = this.currentUser.basket.indexOf(currentItem[0]);

    if (index < 0) {
      this.currentUser.basket.push({
        id: product.id,
        count: 1,
      });
    } else {
      this.currentUser.basket.splice(index, 1);
    }

    this.userService
      .update(this.currentUser)
      .then(() => {
        product.basket = !product.basket;
        this.toast.success(
          product.basket
            ? 'Product added to basket'
            : 'Product deleted from basket'
        );
        localStorage.setItem('userList', JSON.stringify(this.currentUser));
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public addToLicked(product: IProductResponseFakeAPI): void {
    const index = this.currentUser.liked.indexOf(product.id);
    if (index < 0) {
      this.currentUser.liked.push(product.id);
    } else {
      this.currentUser.liked.splice(index, 1);
    }

    this.userService
      .update(this.currentUser)
      .then(() => {
        product.liked = !product.liked;
        this.toast.success(
          product.liked
            ? 'Product added to licked'
            : 'Product deleted from licked'
        );
        localStorage.setItem('userList', JSON.stringify(this.currentUser));
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }
}
