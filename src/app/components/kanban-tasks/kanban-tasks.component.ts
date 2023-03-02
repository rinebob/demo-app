import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { ALLOCATED_TASKS_INITIALIZER, COLUMN_COLOR, COLUMN_ORDER_FROM_STATUS } from 'src/app/common/constants';
import { DialogCloseResult, SortedTasks, Task } from '../../common/interfaces';
import { allocateTasksToColumns } from '../../common/task_utils';

@Component({
  selector: 'app-kanban-tasks',
  templateUrl: './kanban-tasks.component.html',
  styleUrls: ['./kanban-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanTasksComponent {
  @Input()
  set tasks(tasks: Task[]) {
    if (tasks && tasks.length) {
      this.tasksBS.next(tasks);
      this.allocateTasksToColumns(this.tasksBS.value);
      // console.log('kT @i input kanban tasks: ', this.tasksBS.value);
    }
  }
  get tasks() {
    return this.tasksBS.value;
  }
  tasksBS = new BehaviorSubject<Task[]>([]);

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  allocatedTasks: SortedTasks = ALLOCATED_TASKS_INITIALIZER;
  columns: string[] = [];

  emptyBoardText = 'This board is empty.  Create a new column to get started.';

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  allocateTasksToColumns(tasks: Task[]) {
    const {allocatedTasks, columns} = allocateTasksToColumns(this.tasks);
    this.allocatedTasks = allocatedTasks;
    this.columns = columns;
    // console.log('vB ctor t.allocatedTasks: ', this.allocatedTasks);
  }

  getWidth(numColumns: number) {
    const columnWidth = this.innerWidth / numColumns;
    // console.log('vB gW total width/numColumns/column width: ', this.innerWidth, numColumns, columnWidth);

    return columnWidth;
  }

  getColumnOrder(column: string) {
    const order = COLUMN_ORDER_FROM_STATUS[column];
    // console.log('vB gCO column/order: ', column, order);
    return order;
  }

  getColumnColor(column: string) {
    const color = COLUMN_COLOR[column];
    // console.log('vB gCO column/color: ', column, color);
    return color;
  }

  addNewColumn() {
    // console.log('vB aNC add new column called');
  }

  setSelectedTask(task: Task) {
    // console.log('vB sST selected task: ', task);
    this.selectedTaskBS.next(task);
    this.openViewTaskDialog();
  }

  openViewTaskDialog() {
    const dialogData = {
      task: this.selectedTaskBS.value,
    }

    const dialogRef = this.dialog.open(ViewTaskComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('vB oVTD view task dialog closed.  result: ', result);

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

    // console.log('vB oETD edit task called. displayName: ', task.displayName);

    const dialogData = {
      task: this.selectedTaskBS.value,
    }

    const dialogRef = this.dialog.open(TaskFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('vB oETD edit task dialog closed.  result: ', result);
    });

    
  }

  openDeleteTaskDialog(task: Task) {

    // console.log('vB oDTD delete task called. display name: ', task.displayName);

    const dialogData = {
      task,
    }

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('vB oDTD delete task dialog closed.  result: ', result);
    });

  }


}
