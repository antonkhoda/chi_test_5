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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
