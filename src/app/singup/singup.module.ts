import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingupComponent } from "./singup.component";
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: SingupComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SingupModule { }
