import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Auth, authState, idToken, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = user(this.auth);
  authState$ = authState(this.auth);
  idToken$ = idToken(this.auth);
  
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  

  constructor(private auth: Auth) {

    this.isLoggedIn$ = this.authState$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.authState$.pipe(map(user => !user));
  }

  logout() {
    this.auth.signOut();
  }
}
