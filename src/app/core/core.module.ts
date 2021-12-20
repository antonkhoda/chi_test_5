import { NgModule } from '@angular/core';
import { AuthService } from '../assets/services/auth/auth.service';
import { CategoryService } from '../assets/services/category/category.service';
import { ImageService } from '../assets/services/image/image.service';
import { ProductService } from '../assets/services/product/product.service';


@NgModule({
  providers: [
    AuthService,
    CategoryService,
    ImageService,
    ProductService
  ]
})
export class CoreModule { }
