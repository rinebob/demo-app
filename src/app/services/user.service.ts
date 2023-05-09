import { Injectable } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';

import { Auth, authState, idToken,  User, user } from '@angular/fire/auth';

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

    // this.userSubscription = this.user$.subscribe((aUser: User | null) => {
    //   //handle user state changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log('uS ctor user subscription: ',aUser);
    // });

    // this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
    //   //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log('uS ctor auth state subscription: ',aUser);
    // });

    // this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
    //   //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log('uS ctor id token subscription: ', token);
    // });

   }

   ngOnDestroy() {
    // this.userSubscription.unsubscribe();
    // this.authStateSubscription.unsubscribe();
    // this.idTokenSubscription.unsubscribe();

    
  }

  logout() {
    console.log('uS l logging out');
    this.auth.signOut();
  }
}
