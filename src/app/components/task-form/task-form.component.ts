import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogCloseResult, DialogData, FormMode, SubTask, SubTaskStatus, Task, TaskStatus } from 'src/app/common/interfaces';
import { TASK_INITIALIZER } from '../../common/constants';
import { BoardsService } from 'src/app/services/boards.service';
import { BoardsStore } from 'src/app/services/boards-store.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {
  taskBS = new BehaviorSubject<Task>(TASK_INITIALIZER);
  task$: Observable<Task> = this.taskBS;

  taskForm: FormGroup;
  displayNameControl = new FormControl('');
  descriptionControl = new FormControl('');
  statusControl = new FormControl(TaskStatus.NOT_STARTED);
  
  subtaskDescriptionControl = new FormControl('');
  subtasksArray = new FormArray([this.subtaskDescriptionControl]);

  defaultStatusValue = '';
  readonly TaskStatus = TaskStatus;
  TASK_STATUS_VALUES = Object.values(TaskStatus);

  readonly FormMode = FormMode;
  formMode: FormMode = FormMode.CREATE;

  constructor(private boardsService: BoardsService,
            public dialogRef: MatDialogRef<TaskFormComponent>,
            private boardsStore: BoardsStore,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.buildTaskForm();

      if (data && data.boardId) {
        this.formMode = FormMode.CREATE;
        this.defaultStatusValue = TaskStatus.NOT_STARTED;
        // console.log('tF ctor board id for create task: ', data.boardId);
        this.populateForm(this.taskBS.value);

      }

      if (data && data.task) {
        this.formMode = FormMode.EDIT;
        this.taskBS.next(data.task)
        // console.log('tF ctor task to edit: ', data.task);
        this.populateForm(this.taskBS.value);
      }
  }

  buildTaskForm() {
    this.taskForm = new FormGroup({
      'displayNameControl': this.displayNameControl,
      'descriptionControl': this.descriptionControl,
      'subTasks': this.subtasksArray,
      'statusControl': this.statusControl,
    })
  }

  populateForm(task: Task) {
    if (task.subTasks?.length > 0) {
      this.deleteSubTask('0');
      for (const subtask of this.taskBS.value.subTasks) {
        const subtaskControl = new FormControl(subtask.description);
        this.subtasksArray.push(subtaskControl);
      }
    }

    this.taskForm.patchValue({
      'displayNameControl': task.displayName ?? '',
      'descriptionControl': task.description ?? '',
      'statusControl': task.status ?? '',
    });

    this.defaultStatusValue = task.status;

  }

  getSubTasks() {
    return this.taskForm.get('subTasks') as FormArray;
  }

  addSubTask(event: any) {
    const subtaskControl = new FormControl('');
    this.subtasksArray.push(subtaskControl);
  }

  deleteSubTask(index: string) {
    this.subtasksArray.removeAt(Number(index));
  }

  handleSaveTask() {
    const taskData = this.taskForm.value;
    console.log('tF hST task form values: ', taskData);

    const task: Task = {
      id: this.taskBS.value.id ?? undefined,
      displayName: taskData.displayNameControl,
      description: taskData.descriptionControl,
      status: taskData.statusControl,
      subTasks: this.taskForm.value.subTasks,
    }
    
    if (this.formMode === FormMode.EDIT) {
      task.boardId = this.taskBS.value.boardId,
      console.log('tF hST updated task to BE: ', task);
      // this.boardsService.updateTaskInBoard(task.boardId ?? -1, task.id ?? -1, task);
      this.boardsService.updateTaskInBoard(task.boardId ?? -1, task.id ?? -1, task);
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_COMPLETE});

    } else {
      task.boardId = this.data.boardId,
      console.log('tF hST new task to create: ', task);
      // this.boardsService.createTaskInBoard(task.boardId ?? -1, task);
      this.boardsService.createTaskInBoard(task.boardId ?? -1, task);
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_COMPLETE});
      

    }
  }

  handleCancel() {
    if (this.formMode === FormMode.CREATE) {
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_CANCELLED});

    } else {
      this.dialogRef.close({outcome: DialogCloseResult.EDIT_TASK_CANCELLED});

    }

  }

}
