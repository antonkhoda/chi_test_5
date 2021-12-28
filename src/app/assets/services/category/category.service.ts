import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlFakeAPI = 'https://fakestoreapi.com/products';

  constructor(
    private firestore: Firestore
  ) { }

  public getAll(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "category"), { idField: 'id' });
  }

  public create(category: ICategoryRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, "category"), category);
  }

  public update(category: ICategoryRequest, id: string): Promise<void> {
    return setDoc(doc(this.firestore, "category", id), category);
  }

  public delete(category: ICategoryResponse): Promise<void> {
    return deleteDoc(doc(this.firestore, "category", category.id as string));
  }

  public getAllCategoriesFakeAPI(): Promise<Response> {
    return fetch(`${this.urlFakeAPI}/categories`);
  }

  public getAllProductsByCategoryFakeAPI(categoryName: string): Promise<Response> {
    return fetch(`${this.urlFakeAPI}/category/${categoryName}`);
  }
}
