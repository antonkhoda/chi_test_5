import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { IOrder } from '../../interfaces/order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  public create(order: IOrder): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, 'orders'), order);
  }
}
