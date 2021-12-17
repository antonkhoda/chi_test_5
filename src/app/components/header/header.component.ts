import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/assets/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAdminLogin: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userStatus();
  }

  public logOut(): void{
    this.authService.logOut();
  }

  userStatus(): void {
    if(localStorage.length > 0 && localStorage.getItem('userList')){
      const user = JSON.parse(localStorage.getItem('userList') as string);   
      if(user && user.role === 'ADMIN'){
        this.isAdminLogin = true;
      }
    }
  }

}
