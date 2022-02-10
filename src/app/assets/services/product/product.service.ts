import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IBasketRequestArr } from '../../interfaces/basket/basket';
import { IProductRequest, IProductRequestFakeAPI, IProductResponse, IProductResponseFakeAPI } from "../../interfaces/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlFakeAPI = 'https://fakestoreapi.com/products';
  public productsState: Array<IProductRequestFakeAPI> = [];

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

  public getAllProductsFakeAPI(): Promise<Response> {
    return fetch(this.urlFakeAPI);
  }

  public filterProductsByCategory(categoryName: string): Array<IProductRequestFakeAPI>{
    return this.productsState.filter(val => val.category === categoryName);
  }

  public filterProductsByState(stateArr: Array<number | string | undefined>): Array<IProductRequestFakeAPI>{
    return this.productsState.filter(val => stateArr?.indexOf(val.id) !== -1);
  }

  public filterModProductsByState(stateArr: Array<IBasketRequestArr>): Array<IProductResponseFakeAPI>{
    let resultArr: Array<IProductResponseFakeAPI>= [];
    let count: number = 1;
    
    this.filterProductsByState(stateArr?.map(val => val.id))
    .forEach(element => {
      count = stateArr?.find(val => val.id === element.id)?.count as number;
      resultArr.push(Object.assign({}, element, {count: count}))
    });

    return resultArr;   
  }

  public getSingleProduct(productId: string | number): IProductRequestFakeAPI | undefined {    
    return this.productsState.find(({ id }) => id === productId);
  }
}
