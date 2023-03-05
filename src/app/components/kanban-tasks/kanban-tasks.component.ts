import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { ColumnSettingsComponent } from '../column-settings/column-settings.component';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { ALLOCATED_TASKS_INITIALIZER, COLUMN_COLOR, COLUMN_ORDER_FROM_STATUS } from 'src/app/common/constants';
import { DialogCloseResult, SortedTasks, Task } from '../../common/interfaces';
import { allocateTasksToColumns } from '../../common/task_utils';


@Component({
  selector: 'app-kanban-tasks',
  templateUrl: './kanban-tasks.component.html',
  styleUrls: ['./kanban-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTasksComponent {
  @Input()
  set tasks(tasks: Task[]) {
    this.tasksBS.next(tasks);
    // console.log('kT @i input kanban tasks: ', this.tasksBS.value);
    this.allocateTasksToColumns(this.tasksBS.value);
  }
  get tasks() {
    return this.tasksBS.value;
  }
  tasksBS = new BehaviorSubject<Task[]>([]);

  @Output() addTask = new EventEmitter<void>();

  allTasksByStatus$ = this.boardsStore.allTasksByStatus$;
  allColumnsWithTasks$ = this.boardsStore.allColumnsWithTasks$;
  userSelectedColumns$ = this.boardsStore.userSelectedColumns$;
  numberOfTasksPerColumn$ = this.boardsStore.numberOfTasksPerColumn$;

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  allocatedTasks: SortedTasks = ALLOCATED_TASKS_INITIALIZER;
  columns: string[] = [];
  columnsWithTasks: string[] = [];
  userSelectedColumns: string[] = [];
  numTasksByColumn: {[key: string]: number};
  
  emptyBoardText = 'This board is empty.  Create a new task to get started.';

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private dialog: MatDialog, private boardsStore: BoardsStore,) {

    this.userSelectedColumns$.pipe().subscribe(columns => {
      console.log('kT ctor user selected columns sub: ', columns);
      this.userSelectedColumns = columns;
    });

    this.numberOfTasksPerColumn$.pipe().subscribe(numbers => {
      console.log('kT ctor num tasks by column sub: ', numbers);
      this.numTasksByColumn = numbers;
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  allocateTasksToColumns(tasks: Task[]) {
    const {allocatedTasks, columns} = allocateTasksToColumns(this.tasks);
    this.allocatedTasks = allocatedTasks;
    this.columns = columns;
    this.columnsWithTasks = columns;
    this.userSelectedColumns = columns;
    this.boardsStore.setallTasksByStatus(allocatedTasks);
    this.boardsStore.setAllColumnsWithTasks(columns);
    this.boardsStore.setUserSelectedColumns(columns);
    // console.log('kT aTTC t.allocatedTasks: ', this.allocatedTasks);
  }
  
  getWidth(numColumns: number) {
    const columnWidth = this.innerWidth / numColumns;
    // console.log('kT gW total width/numColumns/column width: ', this.innerWidth, numColumns, columnWidth);

    return columnWidth;
  }

  getColumnOrder(column: string) {
    const order = COLUMN_ORDER_FROM_STATUS[column];
    // console.log('kT gCO column/order: ', column, order);
    return order;
  }

  getColumnColor(column: string) {
    const color = COLUMN_COLOR[column];
    // console.log('kT gCO column/color: ', column, color);
    return color;
  }

  addNewTask() {
    this.addTask.emit();
    // console.log('kT aNC add new task called');
  }

  setSelectedTask(task: Task) {
    // console.log('kT sST selected task: ', task);
    this.selectedTaskBS.next(task);
    this.openViewTaskDialog();
  }

  openViewTaskDialog() {
    const dialogData = {
      task: this.selectedTaskBS.value,
    }

    const dialogRef = this.dialog.open(ViewTaskComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oVTD view task dialog closed.  result: ', result);

      if (result && this.selectedTaskBS.value) {
        if (result.outcome === DialogCloseResult.EDIT_TASK) {
          this.openEditTaskDialog(this.selectedTaskBS.value);

        } else if (result.outcome === DialogCloseResult.DELETE_TASK) {
          this.openDeleteTaskDialog(this.selectedTaskBS.value);
        }
      }

    });

  }

  openEditTaskDialog(task: Task) {

    // console.log('kT oETD edit task called. displayName: ', task.displayName);

    const dialogData = {
      task: this.selectedTaskBS.value,
    }

    const dialogRef = this.dialog.open(TaskFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oETD edit task dialog closed.  result: ', result);
    });

    
  }

  openDeleteTaskDialog(task: Task) {

    // console.log('kT oDTD delete task called. display name: ', task.displayName);

    const dialogData = {
      task,
    }

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oDTD delete task dialog closed.  result: ', result);
    });

  }

  openColumnSettingsDialog() {

    const dialogData = {
      columns: this.userSelectedColumns,
      numTasksByColumn: this.numTasksByColumn,
    }

    const dialogRef = this.dialog.open(ColumnSettingsComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('kT oCSD column settings dialog closed.  result: ', result);
      // console.log('kT oCSD updated columns: ', result['columns']);
      if (result && result.columns) {
        this.boardsStore.setUserSelectedColumns(result['columns']);
      }
    });

  }

}
