import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs';
import { ALLOCATED_TASKS_INITIALIZER, BOARD_INITIALIZER, COLUMN_COLOR, COLUMN_ORDER_FROM_STATUS } from 'src/app/common/constants';
import { Board, SortedTasks, Task, TaskStatus } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBoardComponent implements OnInit {

  boardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  board$: Observable<Board> = this.boardBS;

  tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksBS;

  // allocatedTasks = new Map<string, Task[]>([]);
  // allocatedTasks: {[key: string]: Task[]} = {};
  allocatedTasks: SortedTasks = ALLOCATED_TASKS_INITIALIZER;
  columns: string[] = [];

  emptyBoardText = 'This board is empty.  Create a new column to get started.';

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // console.log('vB oR event: ', event)
    this.innerWidth = window.innerWidth;
  }

  constructor(private boardsService: BoardsService, 
    private router: Router,
    private route: ActivatedRoute) {

      this.route.data.pipe().subscribe(data => {
        // console.log('vB ctor route data: ', data);
        if (data && data['board'] && data['board'].displayName !== '') {
          // console.log('vB ctor selected board from route: ', data['board']);
          this.boardBS.next(data['board']);
          const tasks = this.boardBS.value.tasks;
          // console.log('vB ctor tasks from board: ', tasks);
          this.allocatedTasks = {};
          this.allocateTasksToColumns();
        }
      });

      this.board$.pipe().subscribe(board => {
        // console.log('vB ctor board sub: ', board);
      });



  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('vB ngOI paramMap id: ', id);
    // this.board$ = this.boardsService.getBoard(id ?? 0);
    // this.allocateTasksToColumns();
  }

  allocateTasksToColumns() {
    const tasks = this.boardBS.value.tasks ?? [];
    const statusValues = new Set<string>(['new-column']);

    if (tasks) {
      for (const task of tasks) {
        // console.log('--------------------------------------')
        // console.log('vB aTTC input task: ', task);
        const status = task.status;
        statusValues.add(status);
        // console.log('vB aTTC t.allocTasks start: ', this.allocatedTasks);
        let existingTasks = this.allocatedTasks[status] ?? [];
        // console.log('vB aTTC status/values: ', status, statusValues);
        // console.log('vB aTTC existing tasks: ', existingTasks);
        
        if (existingTasks?.length) {
          // console.log('vB aTTC existing tasks: ', existingTasks);
          // const tasks = Object.values(existingTasks);
          // tasks.push(task);
          existingTasks.push(task);
          // this.allocatedTasks[status] = existingTasks;
        } else {
          // console.log('vB aTTC no existing tasks yet');
          existingTasks = [task];
          // console.log('vB aTTC first existing task: ', existingTasks);
        }
        this.allocatedTasks[status] = existingTasks;
        // console.log('vB aTTC t.allocTasks end: ', this.allocatedTasks);
      }

    }

    
    this.columns = [...statusValues.keys()];
    
    console.log('vB aTTC keys: ', this.columns);
    console.log('vB aTTC final columns/tasks by status map: ', this.columns, this.allocatedTasks);

    for (const column of this.columns) {
      // console.log('vB aTTC column/tasks: ', column, this.allocatedTasks[column]);
    }

  }

  getWidth(numColumns: number) {
    
    // const columnWidth = this.columnsContainerWidth / numColumns;
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
    console.log('vB aNC add new column called');
  }

  editBoard(boardId: number) {
    console.log('vB eB edit board. id: ', boardId);
    this.router.navigateByUrl(`edit/${boardId}`);
    
  }
  
  deleteBoard(boardId: number) {
    console.log('vB dB delete board. id: ', boardId);
    this.boardsService.deleteBoard(boardId);
  }

  editTask(taskId: number) {

    this.board$.pipe(take(1)).subscribe(board => {
      // this.boardsService.updateTaskInBoard(board.id, taskId)

    });
  }

  deleteTask(taskId: number) {

  }
}
