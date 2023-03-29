import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// from https://github.com/angular/angularfire/blob/master/samples/modular/src/app/app.module.ts
import { connectFirestoreEmulator, getFirestore, provideFirestore, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ImBoardsTasksService } from './services/im-boards-tasks.service';
import { StoreModule } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BoardsStore } from './services/boards-store.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DesignSystemComponent } from './design-system/design-system.component';
import { SharedModule } from './shared/shared.module';
import { SocialIconLinksModule } from './shared/social-icon-links/social-icon-links.module';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>(resolve => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DesignSystemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,

    SharedModule,
    SocialIconLinksModule,
    
    // DO NOT DELETE ///////////////////////////////////
    // ANGULAR IN-MEMORY WEB API
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // Use it only in non-prod environment
    // Boards Service is being intercepted but not firestore calls

    // uncomment this to enable (also need to enable elsewhere)
    // environment.production ? [] : 
    //   HttpClientInMemoryWebApiModule.forRoot(
    //     ImBoardsTasksService, { dataEncapsulation: false, delay: 100 }),

    ///////////////////////////////////////

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestore;
    }),
    StoreModule.forRoot({}, {}),
    
  ],
  providers: [
    MatIconRegistry, BoardsStore,
  ],
  exports: [MatIconModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
