import { User } from 'firebase/auth';

export class Session {
  private static _instance: Session;
  private _user: User;

  private constructor() {
    this._user = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  public static get instance(): Session {
    if (!this._instance) {
      this._instance = new Session();
    }
    return this._instance;
  }

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }
}
