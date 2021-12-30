import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IProductModedFakeAPI,
  IProductResponseFakeAPI,
} from 'src/app/assets/interfaces/product/product';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { UserService } from 'src/app/assets/services/user/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  public currentProduct: IProductModedFakeAPI = <IProductModedFakeAPI>{};
  public currentUser!: IUser;
  private subscriptions: Subscription = new Subscription();

  public heartOutlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fheart-outline.svg?alt=media&token=8c871e6e-384f-4c88-8036-5de6069e4859';
  public heartSolidlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fheart-solid.svg?alt=media&token=2a4f1782-01f5-4ccf-931b-bd8424a2d3a0';
  public cartOutlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fshop-outline.svg?alt=media&token=cd9ce470-b49e-4136-930b-2044d82ea0c3';
  public cartSolidlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fshop-solid.svg?alt=media&token=c9b54698-40c8-46ef-8729-abe103cfaed6';

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toast: HotToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
    this.takeCategoryName();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private takeCategoryName(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        const id = Number.parseInt(params['id']);
        this.productService
          .getSingleProductFakeAPI(id)
          .then((res) => res.json())
          .then((json) => {
            this.currentProduct = json;
            this.currentProduct.liked =
              this.currentUser.liked.indexOf(this.currentProduct.id) < 0
                ? false
                : true;
            this.currentProduct.basket = this.currentUser.basket.filter(
              (value) => value.id === this.currentProduct.id
            ).length
              ? true
              : false;
          });
      })
    );
  }

  public addToBasket(): void {
    const currentItem = this.currentUser.basket.filter(
      (value) => value.id == this.currentProduct.id
    );
    const index = this.currentUser.basket.indexOf(currentItem[0]);

    if (index < 0) {
      this.currentUser.basket.push({
        id: this.currentProduct.id,
        count: 1,
      });
    } else {
      this.currentUser.basket.splice(index, 1);
    }

    this.userService
      .update(this.currentUser)
      .then(() => {
        this.currentProduct.basket = !this.currentProduct.basket;
        this.toast.success(
          this.currentProduct.basket
            ? 'Product added to basket'
            : 'Product deleted from basket'
        );
        localStorage.setItem('userList', JSON.stringify(this.currentUser));
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public addToLicked(): void {
    const index = this.currentUser.liked.indexOf(this.currentProduct.id);
    if (index < 0) {
      this.currentUser.liked.push(this.currentProduct.id);
    } else {
      this.currentUser.liked.splice(index, 1);
    }

    this.userService
      .update(this.currentUser)
      .then(() => {
        this.currentProduct.liked = !this.currentProduct.liked;
        this.toast.success(
          this.currentProduct.liked
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
