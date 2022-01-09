import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { UserService } from 'src/app/assets/services/user/user.service';
import { OrderService } from 'src/app/assets/services/order/order.service';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.scss'],
})
export class ShopOrderComponent implements OnInit {
  public orderForm!: FormGroup;
  public currentUser!: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
    this.initForm();
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
    this.orderService
      .create(this.orderForm.value)
      .then(() => {
        this.toast.success('Order successfully added');
        this.orderForm.reset();
        this.currentUser.basket = [];
        this.userService
          .update(this.currentUser)
          .then(() => {
            localStorage.setItem('userList', JSON.stringify(this.currentUser));
          })
          .catch((error) => {
            this.toast.error(`ERROR: ${error}`);
          });
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }
}
