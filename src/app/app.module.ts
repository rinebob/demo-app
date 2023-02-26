import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ImBoardsTasksService } from './services/im-boards-tasks.service';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ListBoardsComponent } from './components/list-boards/list-boards.component';
import { ViewBoardComponent } from './components/view-board/view-board.component';
import { DesignSystemComponent } from './components/design-system/design-system.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardFormComponent,
    TaskFormComponent,
    ListBoardsComponent,
    ViewBoardComponent,
    DesignSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // Use it only in non-prod environment
    environment.production ? [] : 
      HttpClientInMemoryWebApiModule.forRoot(
        ImBoardsTasksService, { dataEncapsulation: false, delay: 100 }),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
