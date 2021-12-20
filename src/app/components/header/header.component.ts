import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/assets/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/assets/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public headerCategories: Array<any> = [];
  public isAdminLogin: boolean = false;
  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.userStatus();
    this.loadCategory();
  }

  public logOut(): void{
    this.authService.logOut();
  }

  public loadCategory(): void {
    this.subscriptions.add(
      this.categoryService.getAll().subscribe((data) => {
        this.headerCategories = data.splice(0);
      })
    );
  }

  public userStatus(): void {
    if(localStorage.length > 0 && localStorage.getItem('userList')){
      const user = JSON.parse(localStorage.getItem('userList') as string);   
      if(user && user.role === 'ADMIN'){
        this.isAdminLogin = true;
      }
    }
  }

}
