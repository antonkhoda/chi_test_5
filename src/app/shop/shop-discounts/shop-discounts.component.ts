import { Component, OnInit } from '@angular/core';
import { IProductResponseFakeAPI } from 'src/app/assets/interfaces/product/product';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { UserService } from 'src/app/assets/services/user/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';

@Component({
  selector: 'app-shop-discounts',
  templateUrl: './shop-discounts.component.html',
  styleUrls: ['./shop-discounts.component.scss'],
})
export class ShopDiscountsComponent implements OnInit {
  public products: Array<any> = [];
  public currentUser!: IUser;

  public heartOutlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fheart-outline.svg?alt=media&token=8c871e6e-384f-4c88-8036-5de6069e4859';
  public heartSolidlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fheart-solid.svg?alt=media&token=2a4f1782-01f5-4ccf-931b-bd8424a2d3a0';
  public cartOutlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fshop-outline.svg?alt=media&token=cd9ce470-b49e-4136-930b-2044d82ea0c3';
  public cartSolidlinePath =
    'https://firebasestorage.googleapis.com/v0/b/chi-shop-fe5ac.appspot.com/o/icons%2Fshop-solid.svg?alt=media&token=c9b54698-40c8-46ef-8729-abe103cfaed6';

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService
      .getAllProductsFakeAPI()
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
