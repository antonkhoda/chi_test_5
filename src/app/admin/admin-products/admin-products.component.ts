import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageService } from 'src/app/assets/services/image/image.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/assets/services/product/product.service';
import { IProductResponse } from 'src/app/assets/interfaces/product/product';
import { CategoryService } from 'src/app/assets/services/category/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  public adminProducts: Array<any> = [];
  public currentProduct!: IProductResponse;
  public adminCategories: Array<any> = [];
  public editStatus = false;
  public productForm!: FormGroup;
  public isUploaded = false;
  public isEdit = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.initProductForm();
    this.loadProduct();
    this.loadCategory();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initProductForm(): void {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{0,8}(.[0-9]{1,4})?$')],
      ],
      category: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  public saveProduct(): void {
    this.productService
      .create(this.productForm.value)
      .then(() => {
        this.toast.success('Product successfully added');
        this.productForm.reset();
        this.isUploaded = false;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public loadProduct(): void {
    this.subscriptions.add(
      this.productService.getAll().subscribe((data) => {
        this.adminProducts = data.splice(0);
      })
    );
  }

  public deleteProduct(product: IProductResponse): void {
    this.productService
      .delete(product)
      .then(() => {
        this.toast.success('Product successfully deleted');
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      imagePath: product.imagePath,
    });
    this.currentProduct = product;
    this.isUploaded = true;
    this.isEdit = true;
  }

  public editSaveChanges(): void {
    this.productService
      .update(this.productForm.value, this.currentProduct.id)
      .then(() => {
        this.toast.success('Product successfully updated');
        this.productForm.reset();
        this.isUploaded = false;
        this.isEdit = false;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public loadCategory(): void {
    this.subscriptions.add(
      this.categoryService.getAll().subscribe((data) => {
        this.adminCategories = data.splice(0);
      })
    );
  }

  public uploadImage(event: any): void {
    const file = event.target.files[0];

    this.imageService
      .upload('product', file.name, file)
      .then((data) => {
        this.productForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public valueImage(path: string): string {
    return this.imageService.value(path, this.productForm);
  }

  public deleteImage(): void {
    this.imageService.delete(this.productForm);
    this.isUploaded = false;
  }
}
