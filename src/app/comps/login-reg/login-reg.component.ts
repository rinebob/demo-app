import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Auth, authState, idToken,  User, user } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';

import { Subscription } from 'rxjs';

// from https://github.com/firebase/firebaseui-web
import firebase from 'firebase/compat/app';

import { LOGIN_INSTRUCTIONS } from '../../common/constants';


// See https://github.com/angular/angularfire/blob/master/docs/auth.md
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegComponent implements OnDestroy, OnInit {
  private auth: Auth = inject(Auth);
  
  provider = new GoogleAuthProvider();

  user$ = user(this.auth);
  userSubscription: Subscription;
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription;

  
  ////////////// FIREBASEUI ////////////////
  // from https://firebase.google.com/docs/auth/web/firebaseui near bottom
  
  signInSuccessWithAuthResult = (authResult: any, redirectUrl: string) => {
    // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
    return true;
  }

  firebaseuiConfig: firebaseui.auth.Config = {
    callbacks: {
      signInSuccessWithAuthResult: this.signInSuccessWithAuthResult,
      // The widget is rendered.
      // Hide the loader.
      // uiShown: function () {document.getElementById('loader')?.style.display = 'none';},

    },
    signInFlow: 'redirect',
    signInSuccessUrl: '/kanban',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '',
    privacyPolicyUrl: '',
  };

  // ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui: firebaseui.auth.AuthUI;

  ///////////////////////////////////////////

  readonly LOGIN_INSTRUCTIONS = LOGIN_INSTRUCTIONS;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log('lR ctor user subscription: ',aUser);
    });

    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log('lR ctor auth state subscription: ',aUser);
    });

    this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
      //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
      // console.log('lR ctor id token subscription: ', token);
    });

  }

  ngOnInit(): void {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', this.firebaseuiConfig);

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
    this.idTokenSubscription.unsubscribe();
  }

}
