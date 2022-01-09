import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { AuthService } from 'src/app/assets/services/auth/auth.service';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/assets/services/user/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public headerCategories: Array<any> = [];
  public heartStatus: boolean = false;
  public cartStatus: boolean = false;
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
    private authService: AuthService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
    this.subscriptions.add(
      this.userService.get(this.currentUser.uid).subscribe(() => {
        this.currentUser = JSON.parse(
          localStorage.getItem('userList') as string
        );
        this.heartStatus = this.currentUser.liked.length ? true : false;
        this.cartStatus = this.currentUser.basket.length ? true : false;
      })
    );
    this.loadCategory();
  }

  public logOut(): void {
    this.authService.logOut();
  }

  public loadCategory(): void {
    this.categoryService
      .getAllCategoriesFakeAPI()
      .then((res) => res.json())
      .then((json) => (this.headerCategories = json));
  }
}
