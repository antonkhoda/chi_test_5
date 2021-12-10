import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getUserLogin();
  }

  private getUserLogin(): boolean {
    if (localStorage.length > 0 && localStorage.getItem('userList')) {
      const user = JSON.parse(localStorage.getItem('userList') as string);
      if (user) {
        return true;
      }
      return false;
    }
    return false;
  }
}
