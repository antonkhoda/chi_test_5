import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/assets/interfaces/category/category';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageService } from 'src/app/assets/services/image/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  public adminCategories: Array<any> = [];
  public currentCategory!: ICategoryResponse;
  public editStatus = false;
  public categoryForm!: FormGroup;
  public isUploaded = false;
  public isEdit = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategory();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  public saveCategory(): void {
    this.categoryService
      .create(this.categoryForm.value)
      .then(() => {
        this.toast.success('Category successfully added');
        this.categoryForm.reset();
        this.isUploaded = false;
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

  public deleteCategory(category: ICategoryResponse): void {
    this.categoryService
      .delete(category)
      .then(() => {
        this.toast.success('Category successfully deleted');
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.currentCategory = category;
    this.isUploaded = true;
    this.isEdit = true;
  }

  public editSaveChanges(): void {
    this.categoryService
      .update(this.categoryForm.value, this.currentCategory.id)
      .then(() => {
        this.toast.success('Category successfully updated');
        this.categoryForm.reset();
        this.isUploaded = false;
        this.isEdit = false;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public uploadImage(event: any): void {
    const file = event.target.files[0];

    this.imageService
      .upload('category', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public valueImage(path: string): string {
    return this.imageService.value(path, this.categoryForm);
  }

  public deleteImage(): void {
    this.imageService.delete(this.categoryForm);
    this.isUploaded = false;
  }
}
