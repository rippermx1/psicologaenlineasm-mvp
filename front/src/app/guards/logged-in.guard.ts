import { Injectable } from '@angular/core';
import { Session } from '../session/adapter.session';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  private session = Session.instance;

  canActivate(): boolean {
    console.log(!this.session.user);
    if (!this.session.user) return true;
    return false;
  }
}
