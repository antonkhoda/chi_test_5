import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { collectionData, deleteDoc, doc, docData, DocumentData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { ICategory } from '../../interfaces/category/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private firestore: Firestore
  ) { }

  getAll(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "category"))
  }

  create(category: ICategory): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, "category"), category);
  }

  update(category: ICategory): Promise<void> {
    return setDoc(doc(this.firestore, "category", category.id as string), category);
  }

  delete(category: ICategory): Promise<void> {
    return deleteDoc(doc(this.firestore, "category", category.id as string));
  }
}
