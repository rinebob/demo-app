import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

import { Auth, authState, idToken,  User, user } from '@angular/fire/auth';
// from https://github.com/firebase/firebaseui-web
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
// See https://github.com/angular/angularfire/blob/master/docs/auth.md
import { getAuth, onAuthStateChanged, signInAnonymously,  signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { LOGIN_INSTRUCTIONS } from '../../common/constants';


@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegComponent implements OnDestroy, OnInit {
  
  provider = new GoogleAuthProvider();

  // user$ = user(this.auth);
  // userSubscription: Subscription;
  // authState$ = authState(this.auth);
  // authStateSubscription: Subscription;
  // idToken$ = idToken(this.auth);
  // idTokenSubscription: Subscription;

  
  ////////////// FIREBASEUI ////////////////
  // from https://firebase.google.com/docs/auth/web/firebaseui near bottom

  // from firebaseui docs
  // must be here to avoid 'used before declared' error
  signInSuccessWithAuthResult = (authResult: any, redirectUrl: string) => {
    // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.

      // console.log('lR sISWAR authResult/redirect url: ', {...authResult}, redirectUrl);
      // console.log('lR sISWAR uid: ', authResult.user.uid);
      
      return true;
    }
    
    signInFailure = (error: firebaseui.auth.AuthUIError) => {
      
      console.log('lR sIF auth error: ', error);
      
  };
  
  firebaseuiConfig: firebaseui.auth.Config = {

    // from firebaseui docs
    callbacks: {
      signInSuccessWithAuthResult: this.signInSuccessWithAuthResult,
      // The widget is rendered.
      // Hide the loader.
      // uiShown: function () {document.getElementById('loader')?.style.display = 'none';},

      signInFailure: this.signInFailure,
    },

    // from ang-u-fb-course
    // also works
    // callbacks: {
    //   signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
    // },

    signInFlow: 'redirect',
    signInSuccessUrl: '/kanban',
    // signInSuccessUrl: '/login',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // autoUpgradeAnonymousUsers: true,
    tosUrl: '',
    privacyPolicyUrl: '',
  };

  // ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui: firebaseui.auth.AuthUI;

  ///////////////////////////////////////////

  readonly LOGIN_INSTRUCTIONS = LOGIN_INSTRUCTIONS;

  constructor(private auth: Auth, readonly router: Router) {
    // this.userSubscription = this.user$.subscribe((aUser: User | null) => {
    //   //handle user state changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log('lR ctor user subscription: ',aUser);
    // });

    // this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
    //   //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log('lR ctor auth state subscription: ',aUser);
    // });

    // this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
    //   //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log('lR ctor id token subscription: ', token);
    // });

  }

  ngOnInit(): void {
    // this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.ui.start('#firebaseui-auth-container', this.firebaseuiConfig);
    this.ui.disableAutoSignIn();
    
    if (this.ui.isPendingRedirect()) {
      // this.ui = new firebaseui.auth.AuthUI(this.auth);
      // this.ui.start('#firebaseui-auth-container', this.firebaseuiConfig);
      // ui.start('#firebaseui-auth-container', uiConfig);
    }

  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
    // this.authStateSubscription.unsubscribe();
    // this.idTokenSubscription.unsubscribe();

    this.ui.delete();
  }

  signInAnonymously() {
    signInAnonymously(this.auth)
    .then(() => {
      console.log('lR sIA anon login success');

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('lR sIA anon login error code/message: ', errorCode, errorMessage);
    });

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('lR sIA anon userId/user: ', uid, user)
      } else {
        console.log('lR sIA anon user malfunction - wtf???')
      }
      console.log('lR sIA this.auth.currentUser: ', this.auth.currentUser)
    });
    this.router.navigateByUrl('kanban');
  }
  
  // onLoginSuccessful(result: any):boolean {
  //   const user = result.user.uid;
  //   console.log('lR oLS login success result: ', {...result});
  //   console.log('lR oLS user: ', user);

  //   return true;
  // }

}
