import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogCloseResult, DialogData, SubTaskStatus, Task, TaskStatus } from 'src/app/common/interfaces';
import { TASK_INITIALIZER } from '../../common/constants';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTaskComponent {

  taskBS = new BehaviorSubject<Task>(TASK_INITIALIZER);
  task$: Observable<Task> = this.taskBS;

  numCompleted = -1;

  SUBTASK_STATUS_VALUES = Object.values(SubTaskStatus);

  viewTaskMenuCssClass = 'view-task-menu-css';
  themeBS = new BehaviorSubject<string[]>([]);
  theme$: Observable<string[]> = this.themeBS;
  

  constructor(public dialogRef: MatDialogRef<ViewTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private _overlayContainer: OverlayContainer
    ) {
      if (data && data.task) {
        this.taskBS.next(data.task)
        // console.log('vT ctor task to view: ', data.task);
        this.numCompleted = this.getNumberOfCompletedSubtasks();
      }

      if (data && data.theme) {
        this.themeBS.next([this.viewTaskMenuCssClass, data.theme]);
        // console.log('tF ctor dialog data theme: ', this.themeBS.value);
        this.applyTheme(data.theme);
      }
  }

  getNumberOfCompletedSubtasks(): number {
    const task = this.taskBS.value;
    let numCompleted = 0;
    if (task && task.displayName !== '' && task.subTasks.length > 0) {
      for (const subtask of task.subTasks) {
        if (subtask.status === SubTaskStatus.COMPLETED) {
          numCompleted ++;
        }
      }
      // console.log('vT gNOCS num completed subtasks: ', numCompleted);
      return numCompleted;
    } else {
      return 0;
    }
  }
  
  editTask(task: Task) {
    // console.log('vT eT edit task called.  task: ', task.displayName);
    this.dialogRef.close({outcome: DialogCloseResult.EDIT_TASK});
    
  }
  
  deleteTask(taskId: number) {
    // console.log('vT dT delete task called.  id: ', taskId);
    this.dialogRef.close({outcome: DialogCloseResult.DELETE_TASK});

  }

  handleCancel() {
    this.dialogRef.close({outcome: DialogCloseResult.VIEW_TASK_CANCELLED});
  }

  applyTheme(theme: string): void {
    // remove old theme class and add new theme class
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    // console.log('bV aT container classes pre: ', overlayContainerClasses);
    const themeClassesToRemove = Array.from(overlayContainerClasses)
    .filter((item: string) => item.includes('kanban-'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    // console.log('bV aT adding theme: ', theme);
    overlayContainerClasses.add(theme);
    // console.log('bV aT container classes post: ', overlayContainerClasses);
  }

}
