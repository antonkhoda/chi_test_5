import { Injectable } from '@angular/core';
import { doc, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/assets/interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: Firestore
  ) { }

  public add(user: IUser): Promise<void> {
    return setDoc(doc(this.afs, "users", user.uid), user);
  }

  public get(userId: string): Observable<DocumentData> {
    return docData(doc(this.afs, "users", userId));
  }

  public update(user: IUser): Promise<void> {
    return setDoc(doc(this.afs, "users", user.uid), user);
  }

}
