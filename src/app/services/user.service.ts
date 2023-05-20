import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Auth, authState, idToken, user } from '@angular/fire/auth';
import { RINEBOB_GMAIL_ADDRESS_TEXT } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = user(this.auth);
  authState$ = authState(this.auth);
  idToken$ = idToken(this.auth);
  
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  isMasterOfTheKnownUniverse$: Observable<boolean>;
  

  constructor(private auth: Auth) {

    this.isLoggedIn$ = this.authState$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.authState$.pipe(map(user => !user));
    
    this.isMasterOfTheKnownUniverse$ = this.authState$.pipe(map(user => {
      if (user && user.email === RINEBOB_GMAIL_ADDRESS_TEXT) {
        // console.log('uS ctor iMOTKU user email: ', user?.email);
        
        return true;
      } else {
        
        return false;
      }
    }));
  }
  
  logout() {
    this.auth.signOut();
  }
}
