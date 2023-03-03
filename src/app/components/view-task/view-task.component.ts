import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<ViewTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
      if (data && data.task) {
        this.taskBS.next(data.task)
        // console.log('vT ctor task to view: ', data.task);
        this.numCompleted = this.getNumberOfCompletedSubtasks();
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

}
