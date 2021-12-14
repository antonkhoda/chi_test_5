import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationBlockComponent } from './registration-block.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegistrationBlockComponent }
]

@NgModule({
  declarations: [
    RegistrationBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationBlockModule { }
