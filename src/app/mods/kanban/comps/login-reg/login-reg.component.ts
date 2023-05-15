import { ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, User, user, onAuthStateChanged, signInAnonymously } from '@angular/fire/auth';
// from https://github.com/firebase/firebaseui-web
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

// See https://github.com/angular/angularfire/blob/master/docs/auth.md

import { LOGIN_INSTRUCTIONS } from '../../../../common/constants';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { AppRoutes } from 'src/app/common/interfaces';


@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegComponent implements OnDestroy, OnInit {
  
  ////////////// FIREBASEUI ////////////////
  // from https://firebase.google.com/docs/auth/web/firebaseui near bottom

  loadingBS = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingBS;

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
    // console.log('lR sIF auth error: ', error);
  };
  
  uiShown() {
    // console.log('lR uIS UI shown');

  }
  
  firebaseuiConfig: firebaseui.auth.Config = {

    // from firebaseui docs
    callbacks: {
      signInSuccessWithAuthResult: this.signInSuccessWithAuthResult,
      signInFailure: this.signInFailure,
      uiShown: this.uiShown,
    },

    signInFlow: 'redirect',
    // signInSuccessUrl: 'kanban',
    signInSuccessUrl: `${AppRoutes.KANBAN}/${AppRoutes.BOARD}`,
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
    tosUrl: '',
    privacyPolicyUrl: '',
  };

  ui: firebaseui.auth.AuthUI;

  ///////////////////////////////////////////

  readonly LOGIN_INSTRUCTIONS = LOGIN_INSTRUCTIONS;

  constructor(private auth: Auth, readonly router: Router) {}

  ngOnInit(): void {
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.ui.start('#firebaseui-auth-container', this.firebaseuiConfig);
    this.ui.disableAutoSignIn();

    // console.log('lR ngOI uid: ', this.auth.currentUser?.uid);

    onAuthStateChanged(this.auth, (user) => {
      // console.log('lR ngOI auth state changed. loadingBS:', this.loadingBS.value);
      // this.loadingBS.next(true);
      if (user) {
        // const uid = user.uid;
        // console.log('lR ngOI auth state changed userId/user: ', uid, user)
        // this.loadingBS.next(false);
      } else {
        // this.loadingBS.next(true);
        // console.log('lR ngOI user login malfunction - wtf???')
      }
      // console.log('lR ngOI this.auth.currentUser: ', this.auth.currentUser)
    });
    
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  signInAnonymously() {
    signInAnonymously(this.auth)
    .then(() => {
      // console.log('lR sIA anon login success.  nav to /kanban/board');
      this.router.navigateByUrl(AppRoutes.KANBAN_BOARD);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('lR sIA anon login error code/message: ', errorCode, errorMessage);
    });
  }
  
  handleLogout() {
    // console.log('lR hLO logout user: ', this.auth.currentUser?.uid);
    this.auth.signOut();
    this.router.navigateByUrl(AppRoutes.KANBAN_LOGOUT);
  }
}
