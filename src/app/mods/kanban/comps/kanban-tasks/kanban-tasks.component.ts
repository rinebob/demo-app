import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { BoardsStore } from 'src/app/services/boards-store.service';
import { ALLOCATED_TASKS_INITIALIZER, COLUMN_COLOR, COLUMN_ORDER_FROM_STATUS, EMPTY_BOARD_TEXT } from 'src/app/common/constants';
import { Column, SortedTasks, SubTaskStatus, Task } from '../../../../common/interfaces';
import { allocateTasksToColumns, generateAllColumnsList } from '../../../../common/task_utils';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-kanban-tasks',
  templateUrl: './kanban-tasks.component.html',
  styleUrls: ['./kanban-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTasksComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
  @Input()
  set tasks(tasks: Task[]) {
    this.tasksBS.next(tasks);
    // console.log('-------------------------------');
    // console.log('kT @i input kanban tasks: ', this.tasksBS.value);
    this.initializeTasks(this.tasksBS.value);
  }
  get tasks() {
    return this.tasksBS.value;
  }
  tasksBS = new BehaviorSubject<Task[]>([]);

  
  @Input()
  set theme(theme: string) {
    this.themeBS.next(theme);
    // console.log('-------------------------------');
    // console.log('kT @i input kanban theme: ', this.themeBS.value);
  }
  get theme() {
    return this.themeBS.value;
  }
  themeBS = new BehaviorSubject<string>('');

  @Output() addTask = new EventEmitter<void>();
  
  allColumns$ = this.boardsStore.allColumns$;
  allTasksByStatus$ = this.boardsStore.allTasksByStatus$;
  allColumnsWithTasks$ = this.boardsStore.allColumnsWithTasks$;
  userSelectedColumns$ = this.boardsStore.userSelectedColumns$;
  numberOfTasksPerColumn$ = this.boardsStore.numberOfTasksPerColumn$;

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  allocatedTasks: SortedTasks = ALLOCATED_TASKS_INITIALIZER;
  allColumns: Column[] = [];
  columnsWithTasks: Column[] = [];
  userSelectedColumns: Column[] = [];
  numTasksByColumn: {[key: string]: number};
  
  readonly EMPTY_BOARD_TEXT = EMPTY_BOARD_TEXT;

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private dialog: MatDialog, private boardsStore: BoardsStore,
    private dialogService: DialogService, private _overlayContainer: OverlayContainer) {

    // console.log('-------------------------------');
    // console.log('kT ctor kanban tasks ctor.  theme: ', this.theme);

    this.allColumns$.pipe(takeUntil(this.destroy$)).subscribe(columns => {
      // console.log('kT ctor all columns sub: ', columns);
      this.allColumns = columns;
    });

    this.allTasksByStatus$.pipe(takeUntil(this.destroy$)).subscribe(allocatedTasks => {
      // console.log('kT ctor allocated tasks sub: ', allocatedTasks);
      this.allocatedTasks = allocatedTasks;
    });

    this.userSelectedColumns$.pipe(takeUntil(this.destroy$)).subscribe(columns => {
      // console.log('kT ctor user selected columns sub pre: ', this.userSelectedColumns);
      this.userSelectedColumns = columns;
      // console.log('kT ctor user selected columns sub post: ', this.userSelectedColumns);
    });

    this.numberOfTasksPerColumn$.pipe(takeUntil(this.destroy$)).subscribe(numbers => {
      // console.log('kT ctor num tasks by column sub: ', numbers);
      this.numTasksByColumn = numbers;
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeTasks(tasks: Task[]) {
    const allocatedTasks = allocateTasksToColumns(this.tasks);
    this.boardsStore.setallTasksByStatus(allocatedTasks);
    
    // console.log('kT iT all columns pre: ', [...this.allColumns]);
    
    if (this.userSelectedColumns.length === 0) {
      // console.log('kT iT user columns empty');
      const columns =  generateAllColumnsList();
      const userSelectedColumns: Column[] = [];
      for (const col of columns) {
        if (col.name !== 'new column') {
          if (this.allocatedTasks[col.name] && this.allocatedTasks[col.name].length > 0) {
            col.display = true;
            userSelectedColumns.push(col);
          } else {
            col.display = false;
          }
          
        }
      }
      const newColumn = columns.find(col => col.name === 'new column');
      if (newColumn && userSelectedColumns.length) {
        userSelectedColumns.push(newColumn);

      }
      
      // console.log('kT iT all columns post: ', [...this.allColumns]);
      // console.log('kT iT user columns post: ', [...this.userSelectedColumns]);
      this.boardsStore.setAllColumns([...columns]);

      this.boardsStore.setUserSelectedColumns([...userSelectedColumns]);
    }
    
  }
  
  getWidth(numColumns: number) {
    const columnWidth = this.innerWidth / numColumns;
    // console.log('kT gW total width/numColumns/column width: ', this.innerWidth, numColumns, columnWidth);

    return columnWidth;
  }

  getColumnOrder(columnName: string) {
    // const order = COLUMN_ORDER_FROM_STATUS[columnName];
    const order = this.allColumns.find(col => col.name === columnName)?.order;
    // console.log('kT gCO column/order: ', column, order);
    return order;
  }

  getColumnColor(columnName: string) {
    const color = COLUMN_COLOR[columnName];
    // console.log('kT gCO column/color: ', column, color);
    return color;
  }

  addNewTask() {
    this.addTask.emit();
    // console.log('kT aNC add new task called');
  }

  setSelectedTask(task: Task) {
    console.log('kT sST selected task: ', task);
    this.selectedTaskBS.next(task);
    this.openViewTaskDialog();
  }
  
  getNumCompletedSubtasks(task: Task): number {
    const subtasks = task.subTasks;
    let numCompleted = 0;
    // console.log('kT gNCS subtasks: ', subtasks);

    for (const subtask of subtasks) {
      if (subtask.status === SubTaskStatus.COMPLETED) {
        numCompleted ++;
      }
    }

    return numCompleted;
  }

  openViewTaskDialog() {
    if (this.selectedTaskBS.value) {
      this.dialogService.openViewTaskDialog(this.selectedTaskBS.value, this.theme);
    }
  }

  openColumnSettingsDialog() {
    
    const dialogData = {
      allColumns: this.allColumns,
      userColumns: this.userSelectedColumns,
      numTasksByColumn: this.numTasksByColumn,
    }
    // console.log('kT oCSD theme: ', this.theme);
    this.dialogService.openConfigureColumnsDialog(dialogData, this.theme);
  }

  handleDragStart() {
    // console.log('kT hDS handle drag start');
    this.applyTheme(this.theme);
  }

  dropElement(event: CdkDragDrop<Task[]>) {
    // console.log('kT dE drop element event: ', event);
    // console.log('kT dE prevind/ind/prevCont/cont ', event.previousIndex, event.currentIndex, event.previousContainer.id, event.container.id);
    
    if (event.previousContainer === event.container) {
      // console.log('kT dE move in array');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.boardsStore.setallTasksByStatus({...this.allocatedTasks});
      
    } else {
      // console.log('kT dE transfer item');
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.boardsStore.setallTasksByStatus({...this.allocatedTasks});

      // console.log('kT dE input tasks: ', this.tasks);
      // console.log('kT dE t.allocTasks: ', {...this.allocatedTasks});
      
      const movedTask = event.container.data[event.currentIndex];
      // console.log('kT dE moved task: ', {...movedTask});
      // console.log('kT dE new container id: ', event.container.id);
      const newColumn = this.allColumns.find(col => col.id === Number(event.container.id));
      // console.log('kT dE new column: ', newColumn);
      
      if (movedTask && newColumn && newColumn.name) {
        movedTask.status = newColumn?.name;
        // console.log('kT dE updated moved task: ', {...movedTask});

        this.boardsStore.updateTask(movedTask);
      }
    }
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
