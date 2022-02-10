import { Component, OnInit } from '@angular/core';
import { ProductService } from '../assets/services/product/product.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { HotToastService } from '@ngneat/hot-toast';
import { LikedService } from '../assets/services/liked/liked.service';
import { ILikedRequest } from '../assets/interfaces/liked/liked';
import { BasketService } from '../assets/services/basket/basket.service';
import { IBasketRequest } from '../assets/interfaces/basket/basket';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public currentUser!: IUser;

  constructor(
    private productService: ProductService,
    private likedService: LikedService,
    private basketService: BasketService,
    private toast: HotToastService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
  }

  ngOnInit(): void {
    this.productService
      .getAllProductsFakeAPI()
      .then((res) => res.json())
      .then((json) => {
        this.productService.productsState = json;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });

    this.subscriptions.add(
      this.likedService.valueChanges(this.currentUser.uid).subscribe((data) => {
        if (!data) {
          this.likedService
            .update({ id: this.currentUser.uid, likedArr: [] })
            .catch((error) => {
              this.toast.error(`ERROR: ${error}`);
            });
        }
        this.likedService.likedState = data as ILikedRequest;
      })
    );

    this.subscriptions.add(
      this.basketService
        .valueChanges(this.currentUser.uid)
        .subscribe((data) => {
          if (!data) {
            this.basketService
              .update({ id: this.currentUser.uid, basketArr: [] })
              .catch((error) => {
                this.toast.error(`ERROR: ${error}`);
              });
          }
          this.basketService.basketState = data as IBasketRequest;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
