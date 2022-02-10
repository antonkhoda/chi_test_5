import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { OrderService } from 'src/app/assets/services/order/order.service';
import { BasketService } from 'src/app/assets/services/basket/basket.service';
import { IBasketRequestArr } from 'src/app/assets/interfaces/basket/basket';
import { IOrder } from 'src/app/assets/interfaces/order/order';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.scss'],
})
export class ShopOrderComponent implements OnInit {
  public orderForm!: FormGroup;
  public currentUser!: IUser;
  public basket: Array<IBasketRequestArr> = [];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private basketService: BasketService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
    this.initForm();
  }

  ngDoCheck(): void {
    this.basket = this.basketService.basketState?.basketArr;
  }

  private initForm(): void {
    this.orderForm = this.formBuilder.group({
      email: [
        this.currentUser.email,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      address: [null, [Validators.required]],
    });
  }

  public makeAnOrder(): void {
    if (this.basket.length) {
      const newOrder: IOrder = Object.assign({}, this.orderForm.value, { basketArr: this.basket });

      this.orderService
        .create(newOrder)
        .then(() => {
          this.toast.success('Order successfully added');
          this.orderForm.reset();
          this.basketService
            .update({ id: this.basketService.basketState.id, basketArr: [] })
            .catch((error) => {
              this.toast.error(`ERROR: ${error}`);
            });
          this.router.navigate(['']);
        })
        .catch((error) => {
          this.toast.error(`ERROR: ${error}`);
        });
    } else {
      this.toast.warning('The basket is empty');
    }
  }
}
