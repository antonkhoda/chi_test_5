import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser$ = new Subject<boolean>();

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  public logOut(): void {
    signOut(this.auth).then(() => {
      localStorage.removeItem('userList');
      this.router.navigate(['login']);
      this.currentUser$.next(false);
    })
  }
}
