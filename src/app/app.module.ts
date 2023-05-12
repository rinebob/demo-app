import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { StoreModule } from '@ngrx/store';
import { BoardsStore } from './services/boards-store.service';

import { LandingPageComponent } from './comps/landing-page/landing-page.component';
import { DesignSystemComponent } from './comps/design-system/design-system.component';
import { ProjectCardComponent } from './comps/landing-page/project-card/project-card.component';
import { SkillCardComponent } from './comps/landing-page/skill-card/skill-card.component';
import { ExperienceCardComponent } from './comps/landing-page/experience-card/experience-card.component';
import { connectAuthEmulator } from 'firebase/auth';

import { SharedModule } from './shared/shared.module';
import { SocialIconLinksModule } from './shared/social-icon-links/social-icon-links.module';
import { ThreeWayToggleModule } from './shared/three-way-toggle/three-way-toggle.module';
import { ContactFormComponent } from './comps/landing-page/contact-form/contact-form.component';
import { NameIntroComponent } from './comps/landing-page/name-intro/name-intro.component';

// for angular in memory web api
// import { ImBoardsTasksService } from './services/im-boards-tasks.service';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DesignSystemComponent,
    ProjectCardComponent,
    SkillCardComponent,
    ExperienceCardComponent,
    ContactFormComponent,
    NameIntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
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
    ThreeWayToggleModule,
    
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
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: false});
      }
      return auth;
    }),
    
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
          connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
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
