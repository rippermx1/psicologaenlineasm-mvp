import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Session } from '../session/adapter.session';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private session = Session.instance;

  canActivate(): boolean {
    if (this.session.user) return true;
    return false;
  }
}
