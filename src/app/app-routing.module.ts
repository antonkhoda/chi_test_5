import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './assets/guards/login/login.guard';
import { UserGuard } from './assets/guards/user/user.guard';

const routes: Routes = [
  {
    path: 'login',
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('./login/login.module').then((module) => module.LoginModule),
  },
  {
    path: '',
    canLoad: [UserGuard],
    loadChildren: () =>
      import('./shop/shop.module').then((module) => module.ShopModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
