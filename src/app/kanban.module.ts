import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { KanbanRoutingModule } from './kanban-routing.module';
import { environment } from '../environments/environment';
import { ImBoardsTasksService } from './services/im-boards-tasks.service';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ListBoardsComponent } from './components/list-boards/list-boards.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { DesignSystemComponent } from './components/design-system/design-system.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { KanbanTasksComponent } from './components/kanban-tasks/kanban-tasks.component';

@NgModule({
  declarations: [
    BoardFormComponent,
    TaskFormComponent,
    ListBoardsComponent,
    BoardViewComponent,
    DesignSystemComponent,
    ViewTaskComponent,
    CreateColumnComponent,
    DeleteConfirmComponent,
    KanbanTasksComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
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

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // Use it only in non-prod environment
    // environment.production ? [] : 
    //   HttpClientInMemoryWebApiModule.forChild(
    //     ImBoardsTasksService, { dataEncapsulation: false, delay: 100 }),
 ],
})
export class KanbanModule { }
