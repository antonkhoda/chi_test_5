import { Component, OnInit } from '@angular/core';
import { IProductResponseFakeAPI } from 'src/app/assets/interfaces/product/product';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { UserService } from 'src/app/assets/services/user/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';

@Component({
  selector: 'app-shop-liked',
  templateUrl: './shop-liked.component.html',
  styleUrls: ['./shop-liked.component.scss'],
})
export class ShopLikedComponent implements OnInit {
  public products: Array<any> = [];
  public currentUser!: IUser;

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

        this.products = this.products.filter(
          (element) => this.currentUser.liked.indexOf(element.id) >= 0
        );
        this.products.forEach((element) => {
          element.liked = true;
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
    this.currentUser.liked.splice(index, 1);
    this.products.splice(this.products.indexOf(product), 1);

    this.userService
      .update(this.currentUser)
      .then(() => {
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
