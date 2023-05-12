import { ChangeDetectionStrategy, Component, Inject, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { User } from '@angular/fire/auth';

import { DialogCloseResult, DialogData, FormMode, SubTask, SubTaskStatus, Task, TaskStatus, TASK_STATUS_VALUES } from 'src/app/common/interfaces';
import { TASK_INITIALIZER } from '../../../../common/constants';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
  @ViewChildren('checkbox') checkboxes!: QueryList<MatCheckbox>;
  taskBS = new BehaviorSubject<Task>(TASK_INITIALIZER);
  task$: Observable<Task> = this.taskBS;

  subtasksBS = new BehaviorSubject<SubTask[]|undefined>(undefined);
  subtasks$: Observable<SubTask[]|undefined> = this.subtasksBS;

  selectedBoard$ = this.boardsStore.selectedBoard$;

  taskForm: FormGroup;
  displayNameControl = new FormControl('');
  descriptionControl = new FormControl('');
  selectedStatus = TaskStatus.PLANNING;
  statusControl = new FormControl(this.selectedStatus);
  
  subtasksFormArray = new FormArray([
    new FormGroup({
      'subtaskDescriptionControl': new FormControl(''),
      'subtaskStatusControl': new FormControl(false),
    })
  ]);

  readonly TaskStatus = TaskStatus;
  readonly TASK_STATUS_VALUES = TASK_STATUS_VALUES;

  readonly FormMode = FormMode;
  formMode: FormMode = FormMode.CREATE;

  themeBS = new BehaviorSubject<string[]>([]);
  theme$: Observable<string[]> = this.themeBS;
  taskFormPanelClass = 'task-form-panel-class';

  user$ = this.userService.user$;
  ownerUidBS = new BehaviorSubject<string>('');

  constructor(public dialogRef: MatDialogRef<TaskFormComponent>,
            private boardsStore: BoardsStore, private _overlayContainer: OverlayContainer,
            @Inject(MAT_DIALOG_DATA) public data: DialogData,
            readonly userService: UserService,
    ) {

      // console.log('tF ctor dialog data: ', data);

      // console.log('tF ctor task/subtasks: ', data.task, data.task?.subTasks);

      this.user$.pipe(takeUntil(this.destroy$)).subscribe((user: User | null) => {
        if (user) {
          this.ownerUidBS.next(user?.uid);
          // console.log('tF ctor user id/value: ',user.uid, user);
        }
      });

      this.buildTaskForm();

      if (data && data.boardId) {
        this.formMode = FormMode.CREATE;
        // console.log('tF ctor board id for create task: ', data.boardId);
        this.populateForm(this.taskBS.value);
        
      }
      
      if (data && data.task) {
        this.formMode = FormMode.EDIT;
        this.taskBS.next(data.task)
        // console.log('tF ctor task to edit: ', data.task);
        this.populateForm(this.taskBS.value);
      }

      if (data && data.theme) {
        this.themeBS.next([this.taskFormPanelClass, data.theme]);
        // console.log('tF ctor dialog data theme: ', data.theme);
        // console.log('tF ctor themeBS: ', this.themeBS.value);
        this.applyTheme(data.theme);
      }

      // this.statusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      //   console.log('tF ctor status control values sub: ', changes);
      // });

      // this.taskForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      //   console.log('tF ctor task form values sub: ', changes);
      // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSubtaskStatusBoolValue(status: string) {
    return  status === SubTaskStatus.COMPLETED ? true : false;
  }

  buildSubtaskForm(subtask?: SubTask) {
    let subtaskForm: FormGroup;
    if (subtask) {
      subtaskForm = new FormGroup({
        'subtaskDescriptionControl': new FormControl(subtask.description),
        'subtaskStatusControl': new FormControl(this.getSubtaskStatusBoolValue(subtask.status)),
      });
    } else {
      subtaskForm = new FormGroup({
        'subtaskDescriptionControl': new FormControl(''),
        'subtaskStatusControl': new FormControl(false),
      });
    }
    // console.log('tF bSF subtaskForm: ', subtaskForm);
    return subtaskForm;
  }

  buildTaskForm() {
    this.taskForm = new FormGroup({
      'displayNameControl': this.displayNameControl,
      'descriptionControl': this.descriptionControl,
      'subtasksFormArray': this.subtasksFormArray,
      'statusControl': this.statusControl,
    })
  }

  populateForm(task: Task) {
    // console.log('tF pF incoming task: ', task);
 
    this.taskForm.patchValue({
      'displayNameControl': task.displayName ?? '',
      'descriptionControl': task.description ?? '',
      'statusControl': task.status ?? TaskStatus.PLANNING,
    });
    this.taskForm.removeControl('subtasksFormArray');
 
    if (task.subTasks?.length > 0) {
      const blankForm = this.buildSubtaskForm();
      let subtasksFormArray = new FormArray([blankForm]);
      subtasksFormArray.clear();
      // console.log('tF pF subtasksFormArray pre: ', subtasksFormArray.value);
      
      for (const subtask of task.subTasks) {
        // console.log('tF pF subtask: ', subtask);
        const subtaskForm = new FormGroup({
          'subtaskDescriptionControl': new FormControl(subtask.description),
          'subtaskStatusControl': new FormControl(this.getSubtaskStatusBoolValue(subtask.status)),
        });
        subtasksFormArray.push(subtaskForm);
      }
      this.subtasksFormArray.clear()
      this.subtasksFormArray = subtasksFormArray;
      // console.log('tF pF final t.subtasksFormArray: ', this.subtasksFormArray.value);
      
      this.taskForm.addControl('subtasksFormArray', this.subtasksFormArray);

      // console.log('tF pF final populated form: ', this.taskForm.value);
    } else {
      // console.log('tF pF no subtasks: ', this.taskForm.value);
      // console.log('tF pF this.subtasksFormArray: ', this.subtasksFormArray);
      this.taskForm.addControl('subtasksFormArray', this.subtasksFormArray);
    }
  }

  get subtaskControls() {
    return this.taskForm.controls['subtasksFormArray'] as FormArray;
  }

  addSubtask() {
    const subtaskForm = this.buildSubtaskForm();
    this.subtasksFormArray.push(subtaskForm);
    // console.log('tF bSFA t.subtasksFormArray: ', this.subtasksFormArray);
  }

  deleteSubTask(index: string) {
    // this.subtasksArray.removeAt(Number(index));
    this.subtasksFormArray.removeAt(Number(index));
  }

  handleSaveTask() {
    const taskData = this.taskForm.value;
    // console.log('tF hST task form values: ', taskData);
    
    const subTasks = []
    for (const subtask of this.subtasksFormArray.value) {
      
      // console.log('tF hST subtask for BE: ', subtask);

      const statusBool = subtask.subtaskStatusControl?.valueOf() === true ? true : false;

      const s: SubTask = {
        displayName: '',
        status: statusBool === true ? SubTaskStatus.COMPLETED : SubTaskStatus.NOT_STARTED,
        description: subtask.subtaskDescriptionControl?.valueOf() ?? '',
      }
      subTasks.push(s);
    }
    // console.log('tF hST this.subtasksFormArray.value: ', this.subtasksFormArray.value);

    const task: Task = {
      id: this.taskBS.value.id ?? undefined,
      displayName: taskData.displayNameControl,
      description: taskData.descriptionControl,
      status: taskData.statusControl,
      ownerUid: this.ownerUidBS.value,
      subTasks,
    }
    
    if (this.formMode === FormMode.EDIT) {
      task.boardId = this.taskBS.value.boardId,
      // console.log('tF hST updated subtasks/task to BE: ', task.subTasks, task);
      this.boardsStore.updateTask(task);
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_TASK_COMPLETE, updatedTask: task});

    } else {
      task.boardId = this.data.boardId,
      // console.log('tF hST new task to create: ', task);
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
