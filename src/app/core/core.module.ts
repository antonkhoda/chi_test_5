import { NgModule } from '@angular/core';
import { AuthService } from '../assets/services/auth/auth.service';


@NgModule({
  providers: [
    AuthService
  ]
})
export class CoreModule { }
