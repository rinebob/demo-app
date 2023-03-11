import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { BoardsStore } from 'src/app/services/boards-store.service';
import { BoardFormComponent } from '../components/board-form/board-form.component';
import { BoardsSelectComponent } from '../components/boards-select/boards-select.component';
import { ColumnSettingsComponent } from '../components/column-settings/column-settings.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { Board, Column, DialogCloseResult, DialogData, Task } from '../common/interfaces';
import { ViewTaskComponent } from '../components/view-task/view-task.component';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  boardFormPanelClass = 'board-form-panel-class';
  boardsSelectPanelClass = 'boards-select-panel-class';
  columnSettingsPanelClass = 'column-settings-panel-class';
  deleteConfirmPanelClass = 'delete-confirm-panel-class';
  taskFormPanelClass = 'task-form-panel-class';
  viewTaskPanelClass = 'view-task-panel-class';

  constructor(private dialog: MatDialog, private boardsStore: BoardsStore) { }

  openCreateBoardDialog(theme: string) {
    // console.log('bS oCBD create board called');
    const config = new MatDialogConfig();
    config.panelClass = [this.boardFormPanelClass, theme];
    config.data = {theme};
    const dialogRef = this.dialog.open(BoardFormComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('dS oCTD create board dialog closed.  result: ', result);
    });

  }

  openEditBoardDialog(board: Board) {
    const dialogData = {
      board,
    }
    const config = new MatDialogConfig();
    config.panelClass = this.boardFormPanelClass;
    config.data = dialogData;
    // console.log('dS oEBD edit board called. board: ', board);
    const dialogRef = this.dialog.open(BoardFormComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('dS oEBD edit board dialog closed.  result: ', result);
    });
  }

  openCreateTaskDialog(boardId: number) {
    const dialogData = {
      boardId,
    }
    // console.log('dS oCTD create task called. boardId: ', boardId);
    const config = new MatDialogConfig();
    config.panelClass = this.taskFormPanelClass;
    config.data = dialogData;
    const dialogRef = this.dialog.open(TaskFormComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oCTD create task dialog closed.  result: ', result);
    });

  }

  openViewTaskDialog(task: Task) {
    // console.log('kT oVTD view task called. displayName: ', task.displayName);
    const dialogData = {
      task,
    }
    const config = new MatDialogConfig();
    config.panelClass = this.viewTaskPanelClass;
    config.data = dialogData;
    const dialogRef = this.dialog.open(ViewTaskComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oVTD view task dialog closed.  result: ', result);
      if (result && task) {
        if (result.outcome === DialogCloseResult.EDIT_TASK) {
          this.openEditTaskDialog(task);
        } else if (result.outcome === DialogCloseResult.DELETE_TASK) {
          this.openDeleteTaskDialog(task);
        }
      }
    });
  }

  openEditTaskDialog(task: Task) {
    // console.log('kT oETD edit task called. displayName: ', task.displayName);
    const dialogData = {
      task,
    }
    const config = new MatDialogConfig();
    config.panelClass = this.taskFormPanelClass;
    config.data = dialogData;
    const dialogRef = this.dialog.open(TaskFormComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oETD edit task dialog closed.  result: ', result);
    });
  }

  openDeleteTaskDialog(task: Task) {
    // console.log('kT oDTD delete task called. display name: ', task.displayName);
    const dialogData = {
      task,
    }
    const config = new MatDialogConfig();
    config.panelClass = this.deleteConfirmPanelClass;
    config.data = dialogData;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oDTD delete task dialog closed.  result: ', result);
    });
  }

  openConfigureColumnsDialog(data: DialogData) {
    const config = new MatDialogConfig();
    config.panelClass = this.columnSettingsPanelClass;
    config.data = data;
    const dialogRef = this.dialog.open(ColumnSettingsComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oCCD column settings dialog closed.  result: ', result);
      // console.log('bV oCCD updated columns: ', result['columns']);
      if (result && result.columns) {
        this.boardsStore.setAllColumns(result['columns']);
        let cols: Column[] = [];
        for (const col of result['columns']) {
          if (col.display) {
            cols.push(col);
          }
        }
        // console.log('bV oCCD updated user selected columns: ', cols);
        this.boardsStore.setUserSelectedColumns(cols);
      }
    });
  }

  openBoardsSelectDialog(data: DialogData): MatDialogRef<BoardsSelectComponent, any> {
    // console.log('bV oBSD open boards select dialog called');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = this.boardsSelectPanelClass;
    dialogConfig.data = {...data};
    const dialogRef = this.dialog.open(BoardsSelectComponent, dialogConfig);

    return dialogRef;
  }
}
