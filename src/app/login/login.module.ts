import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from "../shared/shared.module";
import { LoginRoutingModule } from './login-routing.module';
import { LoginBlockComponent } from './login-block/login-block.component';
import { RegistrationBlockComponent } from './registration-block/registration-block.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginBlockComponent,
    RegistrationBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
