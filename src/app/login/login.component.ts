import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginSwitch: boolean = true;

  constructor() { }

  ngOnInit(): void {}

  public loginSwitchBtn(): void{
    this.loginSwitch = !this.loginSwitch;
  }

}
