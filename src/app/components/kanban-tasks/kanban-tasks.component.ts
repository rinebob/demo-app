import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable } from 'rxjs';

import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { ColumnSettingsComponent } from '../column-settings/column-settings.component';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { ALLOCATED_TASKS_INITIALIZER, COLUMN_COLOR, COLUMN_ORDER_FROM_STATUS } from 'src/app/common/constants';
import { Column, DialogCloseResult, SortedTasks, Task } from '../../common/interfaces';
import { allocateTasksToColumns, generateAllColumnsList } from '../../common/task_utils';


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
    // console.log('-------------------------------');
    // console.log('kT @i input kanban tasks: ', this.tasksBS.value);
    this.initializeTasks(this.tasksBS.value);
  }
  get tasks() {
    return this.tasksBS.value;
  }
  tasksBS = new BehaviorSubject<Task[]>([]);

  @Output() addTask = new EventEmitter<void>();
  @Output() updatedTasks = new EventEmitter<Task[]>();

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
  
  emptyBoardText = 'This board is empty.  Create a new task to get started.';

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private dialog: MatDialog, private boardsStore: BoardsStore,) {

    // console.log('-------------------------------');
    // console.log('kT ctor kanban tasks ctor');

    this.userSelectedColumns$.pipe().subscribe(columns => {
      // console.log('kT ctor user selected columns sub pre: ', columns);
      this.userSelectedColumns = columns;
      // console.log('kT ctor user selected columns sub post: ', this.userSelectedColumns);
    });

    this.numberOfTasksPerColumn$.pipe().subscribe(numbers => {
      // console.log('kT ctor num tasks by column sub: ', numbers);
      this.numTasksByColumn = numbers;
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  initializeTasks(tasks: Task[]) {
    const allocatedTasks = allocateTasksToColumns(this.tasks);
    // console.log('kT iT t.allocatedTasks post: ', {...allocatedTasks});
    const columns = generateAllColumnsList();
    this.allocatedTasks = {...allocatedTasks};
    this.allColumns = [...columns];
    // console.log('kT iT t.allColumns pre: ', [...this.allColumns]);
    // console.log('kT iT t.colsWTasks pre: ', [...this.columnsWithTasks]);
    
    this.columnsWithTasks = [];
    for (const col of this.allColumns) {
      if (this.allocatedTasks[col.name] && this.allocatedTasks[col.name].length > 0) {
        this.columnsWithTasks.push(col);
      }
    }
    // console.log('kT iT t.allColumns post: ', [...this.allColumns]);
    // console.log('kT iT t.colsWTasks post: ', [...this.columnsWithTasks]);
    
    if (this.userSelectedColumns.length === 0) {
      this.userSelectedColumns = [...this.columnsWithTasks];
      this.boardsStore.setUserSelectedColumns([...this.columnsWithTasks]);

    }


    // console.log('kT iT t.aT: ', {...this.allocatedTasks});
    // console.log('kT iT t.aT keys: ', Object.keys({...this.allocatedTasks}));
    // console.log('kT iT t.columnsWithTasks pre: ', [...this.columnsWithTasks]);
    // console.log('kT iT t.userSelectedColumns pre: ', [...this.userSelectedColumns]);
    
    
    this.boardsStore.setallTasksByStatus({...allocatedTasks});
    this.boardsStore.setAllColumns([...this.allColumns]);
    this.boardsStore.setAllColumnsWithTasks([...this.columnsWithTasks]);
    // console.log('kT iT t.userSelectedColumns post: ', [...this.userSelectedColumns]);
    // console.log('kT iT t.allocatedTasks: ', this.allocatedTasks);
  }
  
  getWidth(numColumns: number) {
    const columnWidth = this.innerWidth / numColumns;
    // console.log('kT gW total width/numColumns/column width: ', this.innerWidth, numColumns, columnWidth);

    return columnWidth;
  }

  getColumnOrder(columnName: string) {
    const order = COLUMN_ORDER_FROM_STATUS[columnName];
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
      allColumns: this.allColumns,
      userColumns: this.userSelectedColumns,
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

  dropElement(event: CdkDragDrop<Task[]>) {
    // console.log('kT dE drop element event: ', event);
    // console.log('kT dE drop item data: ', event.item.data);
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
      // console.log('kT dE t.allocTasks: ', this.allocatedTasks);
      
      const movedTask = event.container.data[event.currentIndex];
      // console.log('kT dE moved task: ', {...movedTask});
      // console.log('kT dE new container id: ', event.container.id);
      const newColumn = this.allColumns.find(col => col.id === Number(event.container.id));
      // console.log('kT dE new column: ', newColumn);
      
      if (movedTask && newColumn && newColumn.name) {
        movedTask.status = newColumn?.name;
        // console.log('kT dE updated moved task: ', {...movedTask});
        
        const updatedTaskList = this.tasks.filter(task => task.id !== movedTask.id);
        updatedTaskList.push(movedTask);
        
        this.updatedTasks.emit(updatedTaskList);
        // console.log('kT dE emitting updated task list');

      }


    }

  }
}
