import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/assets/services/auth/auth.service';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { LikedService } from 'src/app/assets/services/liked/liked.service';
import { BasketService } from 'src/app/assets/services/basket/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public headerCategories: Array<any> = [];
  public heartStatus: boolean = false;
  public cartStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private likedService: LikedService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  ngDoCheck(): void {
    this.heartStatus = !!this.likedService.likedState?.likedArr?.length;
    this.cartStatus = !!this.basketService.basketState?.basketArr?.length;
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
