import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { IProductRequest, IProductResponse } from "../../interfaces/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: Firestore
  ) { }

  public getAll(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "product"), { idField: 'id' });
  }

  public create(product: IProductRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, "product"), product);
  }

  public update(product: IProductRequest, id: string): Promise<void> {
    return setDoc(doc(this.firestore, "product", id), product);
  }

  public delete(product: IProductResponse): Promise<void> {
    return deleteDoc(doc(this.firestore, "product", product.id as string));
  }
}
