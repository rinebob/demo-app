import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { BoardFormComponent } from './comps/board-form/board-form.component';
import { BoardViewComponent } from './comps/board-view/board-view.component';
import { BoardsSelectComponent } from './comps/boards-select/boards-select.component';
import { ColumnSettingsComponent } from './comps/column-settings/column-settings.component';
import { CreateColumnComponent } from './comps/create-column/create-column.component';
import { DeleteConfirmComponent } from './comps/delete-confirm/delete-confirm.component';
import { DesignSystemComponent } from './comps/design-system/design-system.component';
import { DialogShellComponent } from './comps/dialog-shell/dialog-shell.component';
import { GuidedTourComponent } from './comps/guided-tour/guided-tour.component';
import { KanbanTasksComponent } from './comps/kanban-tasks/kanban-tasks.component';
import { ListBoardsComponent } from './comps/list-boards/list-boards.component';
import { LoginRegComponent } from './comps/login-reg/login-reg.component';
import { TaskFormComponent } from './comps/task-form/task-form.component';
import { ViewTaskComponent } from './comps/view-task/view-task.component';

@NgModule({
  declarations: [
    BoardFormComponent,
    BoardViewComponent,
    BoardsSelectComponent,
    ColumnSettingsComponent,
    CreateColumnComponent,
    DeleteConfirmComponent,
    DesignSystemComponent,
    DialogShellComponent,
    GuidedTourComponent,
    KanbanTasksComponent,
    ListBoardsComponent,
    LoginRegComponent,
    TaskFormComponent,
    ViewTaskComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    DragDropModule,
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
    
    KanbanRoutingModule,
 ],
 exports: [MatIconModule],
})
export class KanbanModule { }


