import { ChangeDetectionStrategy, Component, HostBinding, Inject, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogCloseResult, DialogData, FormMode, SubTask, SubTaskStatus, Task, TaskStatus, TASK_STATUS_VALUES } from 'src/app/common/interfaces';
import { TASK_INITIALIZER } from '../../common/constants';
import { BoardsService } from 'src/app/services/boards.service';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {
  @ViewChildren('checkbox') checkboxes!: QueryList<MatCheckbox>;
  taskBS = new BehaviorSubject<Task>(TASK_INITIALIZER);
  task$: Observable<Task> = this.taskBS;

  subtasksBS = new BehaviorSubject<SubTask[]|undefined>(undefined);
  subtasks$: Observable<SubTask[]|undefined> = this.subtasksBS;

  taskForm: FormGroup;
  displayNameControl = new FormControl('');
  descriptionControl = new FormControl('');
  selectedStatus = TaskStatus.NOT_STARTED
  statusControl = new FormControl(this.selectedStatus);
  
  subtaskDescriptionControl = new FormControl('');
  subtasksArray = new FormArray([this.subtaskDescriptionControl]);
  
  subtaskForm = new FormGroup({
    'subtaskDescriptionControl': new FormControl(''),
    'subtaskStatusControl': new FormControl(SubTaskStatus.NOT_STARTED),
  });
  subtasksFormArray: FormArray;

  defaultStatusValue = '';
  readonly TaskStatus = TaskStatus;
  readonly TASK_STATUS_VALUES = TASK_STATUS_VALUES;

  readonly FormMode = FormMode;
  formMode: FormMode = FormMode.CREATE;

  themeBS = new BehaviorSubject<string[]>([]);
  theme$: Observable<string[]> = this.themeBS;
  taskFormPanelClass = 'task-form-panel-class';

  constructor(private boardsService: BoardsService,
            public dialogRef: MatDialogRef<TaskFormComponent>,
            private boardsStore: BoardsStore, private _overlayContainer: OverlayContainer,
            @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {

      console.log('tF ctor task/subtasks: ', data.task, data.task?.subTasks);

      this.buildSubtaskFormArray();

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
        
        if (data.task.subTasks && data.task.subTasks.length > 0) {
          console.log('tF ctor subtasks: ', data.task.subTasks);
          this.subtasksBS.next(data.task.subTasks)
        } else {
          console.log('tF ctor no subtasks: ', data.task.subTasks);
          // const blankSubtask: SubTask = {displayName: '', description: '', status: SubTaskStatus.NOT_STARTED};
          // this.subtasksBS.next([blankSubtask]);
        }
      }

      if (data && data.theme) {
        this.themeBS.next([this.taskFormPanelClass, data.theme]);
        // console.log('tF ctor dialog data theme: ', this.themeBS.value);
        this.applyTheme(data.theme);
      }

      this.statusControl.valueChanges.pipe().subscribe(changes => {
        // console.log('tF ctor status control values sub: ', changes);
      });

      this.taskForm.valueChanges.pipe().subscribe(changes => {
        // console.log('tF ctor task form values sub: ', changes);
      });
  }

  buildSubtaskForm(subtask?: SubTask) {
    let subtaskForm: FormGroup;
    if (subtask) {
      subtaskForm = new FormGroup({
        'subtaskDescriptionControl': new FormControl(subtask.description),
        'subtaskStatusControl': new FormControl(subtask.status),
      });

      // return subtaskForm;
    } else {
      subtaskForm = new FormGroup({
        'subtaskDescriptionControl': new FormControl(''),
        'subtaskStatusControl': new FormControl(SubTaskStatus.NOT_STARTED),
      });
    }
    console.log('tF bSF subtaskForm: ', subtaskForm);
    return subtaskForm;
  }

  buildSubtaskFormArray() {
    if (this.subtasksBS.value) {
      for (const subtask of this.subtasksBS.value) {
        const subtaskForm = this.buildSubtaskForm(subtask)
        this.subtasksFormArray = new FormArray([subtaskForm]);
      }
    } else {
      const subtaskForm = this.buildSubtaskForm();
      console.log('tF bSF subtaskForm: ', subtaskForm);
      this.subtasksFormArray = new FormArray([subtaskForm]);
    }

    console.log('tF bSFA t.subtasksFormArray: ', this.subtasksFormArray);

  }

  buildTaskForm() {
    this.taskForm = new FormGroup({
      'displayNameControl': this.displayNameControl,
      'descriptionControl': this.descriptionControl,
      // 'subTasks': this.subtasksArray,
      // 'subtasks': this.subtasksFormArray,
      'subtasks': new FormArray([]),
      'statusControl': this.statusControl,
    })
  }

  populateForm(task: Task) {
    if (task.subTasks?.length > 0) {
      this.deleteSubTask('0');
      for (const subtask of this.taskBS.value.subTasks) {
        // const subtaskControl = new FormControl(subtask.description);
        // this.subtasksArray.push(subtaskControl);
      }
    }

    this.taskForm.patchValue({
      'displayNameControl': task.displayName ?? '',
      'descriptionControl': task.description ?? '',
      'statusControl': task.status ?? '',
    });

    this.defaultStatusValue = task.status;

  }

  // updateStatusControl(event: any) {
  //   console.log('tF uSC status control change event: ', event);
  //   const taskData = this.taskForm.value;
  //   console.log('tF hST task form values: ', taskData);

  // }

  getSubTasks() {
    return this.taskForm.get('subTasks') as FormArray;
  }

  get subtasks() {
    return this.taskForm.controls['subtasks'] as FormArray;
  }

  getCheckedStatus(status: string) {
    return status === SubTaskStatus.COMPLETED;

  }

  // addSubTask(event: any) {
  //   const subtaskControl = new FormControl('');
  //   this.subtasksArray.push(subtaskControl);
  // }

  addSubtask() {
    // const blankSubtask: SubTask = {displayName: '', description: '', status: SubTaskStatus.NOT_STARTED};
    // const subtasks = this.subtasksBS.value ? [...this.subtasksBS.value, blankSubtask] : [blankSubtask];
    // this.subtasksBS.next(subtasks)
    const subtaskForm = this.buildSubtaskForm();
    // this.subtasksFormArray.push(subtaskForm);
    this.subtasks.push(subtaskForm);

    console.log('tF bSFA t.subtasksFormArray: ', this.subtasks);
  }

  updateSubtask(event: any) {
    console.log('tF uS update subtask event: ', event);
  }

  deleteSubTask(index: string) {
    // this.subtasksArray.removeAt(Number(index));
    this.subtasks.removeAt(Number(index));
  }

  handleSaveTask() {
    const taskData = this.taskForm.value;
    console.log('tF hST task form values: ', taskData);

    const task: Task = {
      id: this.taskBS.value.id ?? undefined,
      displayName: taskData.displayNameControl,
      description: taskData.descriptionControl,
      status: taskData.statusControl,
      subTasks: this.taskBS.value.subTasks,
    }
    
    if (this.formMode === FormMode.EDIT) {
      task.boardId = this.taskBS.value.boardId,
      console.log('tF hST updated task to BE: ', task);
      // this.boardsService.updateTaskInBoard(task.boardId ?? -1, task.id ?? -1, task);
      // this.boardsService.updateTaskInBoard(task.boardId ?? -1, task.id ?? -1, task);
      this.boardsStore.updateTask(task);
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_COMPLETE, updatedTask: task});

    } else {
      task.boardId = this.data.boardId,
      console.log('tF hST new task to create: ', task);
      // this.boardsService.createTask(task);
      this.boardsStore.createTask(task);
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_COMPLETE, newTask: task});
    }
  }

  handleCancel() {
    if (this.formMode === FormMode.CREATE) {
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_CANCELLED});
    } else {
      this.dialogRef.close({outcome: DialogCloseResult.EDIT_TASK_CANCELLED});
    }
  }

  applyTheme(theme: string): void {
    // remove old theme class and add new theme class
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    // console.log('tF aT container classes pre: ', overlayContainerClasses);
    const themeClassesToRemove = Array.from(overlayContainerClasses)
    .filter((item: string) => item.includes('kanban-'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    // console.log('tF aT adding theme: ', theme);
    overlayContainerClasses.add(theme);
    // console.log('tF aT container classes post: ', overlayContainerClasses);
  }
}
