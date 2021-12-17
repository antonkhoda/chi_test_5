import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/assets/interfaces/category/category';
import { CategoryService } from 'src/app/assets/services/category/category.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { ImageService } from 'src/app/assets/services/image/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<any> = [];
  public editStatus = false;
  public categoryForm!: FormGroup;
  public isUploaded = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private firestore: Firestore
  ) { }

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
      imagePath: [null, Validators.required]
    })
  }

  public saveCategory(): void {
    const { name, path, imagePath } = this.categoryForm.value;
    const newCategory: ICategory = {
      id: this.generateFirestoreId(),
      name: name,
      path: path,
      imagePath: imagePath
    }

    this.categoryService.create(newCategory).then(() => {
      this.toast.success('Category successfully added');
      this.categoryForm.reset();
      this.isUploaded = false;
    }).catch((error) => {
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

  public upload(event: any): void {
    const file = event.target.files[0];


    this.imageService.upload('category', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch((error) => {
        this.toast.error(`ERROR: ${error}`);
      });
  }

  public valueByControl(path: string): string {
    return this.imageService.value(path, this.categoryForm);
  }

  public deleteImage(): void {
    this.imageService.delete(this.categoryForm);
    this.isUploaded = false;
  }

  private generateFirestoreId(): string {
    return doc(collection(this.firestore, '_')).id;
  }
}
