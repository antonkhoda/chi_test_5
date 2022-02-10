import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  DocumentData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ILikedRequest } from '../../interfaces/liked/liked';

@Injectable({
  providedIn: 'root',
})
export class LikedService {
  public likedState: ILikedRequest = <ILikedRequest>{};

  constructor(private firestore: Firestore) {}

  public valueChanges(id: string): Observable<DocumentData> {
    return docData(doc(this.firestore, 'liked', id));
  }

  public update(obj: ILikedRequest): Promise<void> {
    return setDoc(doc(this.firestore, 'liked', obj.id), obj);
  }

  public addOrRemoveFromLiked(id: number): Promise<void> {
    const index = this.likedState.likedArr.indexOf(id);
    const newLikedState: ILikedRequest = JSON.parse(JSON.stringify(this.likedState));

    index === -1
      ? newLikedState.likedArr.push(id)
      : newLikedState.likedArr.splice(index, 1);

    return this.update(newLikedState);
  }
}
