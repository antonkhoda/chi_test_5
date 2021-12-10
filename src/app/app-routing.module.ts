import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './assets/guards/login/login.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'singup',
    loadChildren: () =>
      import('./pages/singup/singup.module').then((module) => module.SingupModule),
  },
  {
    path: 'shop',
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('./pages/shop/shop.module').then((module) => module.ShopModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
