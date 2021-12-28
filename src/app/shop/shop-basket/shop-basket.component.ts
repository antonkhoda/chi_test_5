import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductModedFakeAPI, IProductResponseFakeAPI } from 'src/app/assets/interfaces/product/product';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { UserService } from 'src/app/assets/services/user/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from 'src/app/assets/services/product/product.service';

@Component({
  selector: 'app-shop-basket',
  templateUrl: './shop-basket.component.html',
  styleUrls: ['./shop-basket.component.scss']
})
export class ShopBasketComponent implements OnInit {
  public products: Array<any> = [];
  public totalPrice: number = 0;
  public currentUser!: IUser;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private categoryService: CategoryService,
    private toast: HotToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userList') as string);
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService
      .getAllProductsFakeAPI()
      .then((res) => res.json())
      .then((json) => {
        this.products = json;
        const urrentUserBasket = this.currentUser.basket.map(element => element.id);
        this.totalPrice = 0;
        this.products = this.products.filter(
          (element) => {
            const index = urrentUserBasket.indexOf(element.id);
            if(index >= 0){         
              element.count = this.currentUser.basket[index].count;
              this.totalPrice += element.price * element.count;
              return true;
            }
            return false
          } 
        );
      })
  }

  public deleteFromBasket(product: IProductResponseFakeAPI): void{
    const currentItem = this.currentUser.basket.filter(value => value.id == product.id);
    this.currentUser.basket.splice(this.currentUser.basket.indexOf(currentItem[0]), 1);

    this.userService.update(this.currentUser).then(() => {
      product.basket = false;
      this.toast.success('Product deleted from basket');
      localStorage.setItem('userList', JSON.stringify(this.currentUser));
      this.loadProducts();
    })
    .catch((error) => {
      this.toast.error(`ERROR: ${error}`);
    });
  }

  public increment(product: IProductModedFakeAPI): void{
    this.counter(product, ++product.count)
    this.totalPrice += product.price;
  }

  public decrement(product: IProductModedFakeAPI): void{
    if(product.count > 1){
      this.counter(product, --product.count)
    this.totalPrice -= product.price;
    }
  }

  private counter(product: IProductResponseFakeAPI, count: number): void{
    console.log(count);
    
    const currentItem = this.currentUser.basket.filter(value => value.id == product.id);
    this.currentUser.basket[this.currentUser.basket.indexOf(currentItem[0])].count = count;

    this.userService.update(this.currentUser).then(() => {
      localStorage.setItem('userList', JSON.stringify(this.currentUser));
    })
    .catch((error) => {
      this.toast.error(`ERROR: ${error}`);
    });
  }

}
