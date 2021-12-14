import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, children: [
      {
        path: '',
        loadChildren: () =>
          import('./login-block/login-block.module').then((module) => module.LoginBlockModule),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('./registration-block/registration-block.module').then((module) => module.RegistrationBlockModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
