import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  DocumentData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IBasketRequest } from '../../interfaces/basket/basket';
import { IProductResponseFakeAPI } from '../../interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public basketState: IBasketRequest = <IBasketRequest>{};

  constructor(private firestore: Firestore) {}

  public valueChanges(id: string): Observable<DocumentData> {
    return docData(doc(this.firestore, 'basket', id));
  }

  public update(obj: IBasketRequest): Promise<void> {
    return setDoc(doc(this.firestore, 'basket', obj.id), obj);
  }

  public addOrRemoveFromBasket(id: number): Promise<void> {
    const index = this.basketState.basketArr.map(val => val.id).indexOf(id);
    const newBasketState = JSON.parse(JSON.stringify(this.basketState));

    index === -1
      ? newBasketState.basketArr.push({id: id, count: 1})
      : newBasketState.basketArr.splice(index, 1);

    return this.update(newBasketState);
  }

  public calculateFullPrice(filteredArr: Array<IProductResponseFakeAPI>): number{   
    return filteredArr.reduce((total, val) => total + (val.price * val.count), 0);
  }

  public changeCount(id: number | string, count: number): Promise<void>{  
    const index = this.basketState.basketArr.map(val => val.id).indexOf(id);
    const newBasketState = JSON.parse(JSON.stringify(this.basketState));
    
    newBasketState.basketArr[index].count = count;
    return this.update(newBasketState);
  }

  // public findCount(id: number | string): number{
  //   let result = this.basketState?.basketArr.find(obj => obj.id === id)?.count;
  //   return result? result : 0;
  // }
}
