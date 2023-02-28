import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs';
import { ALLOCATED_TASKS_INITIALIZER, BOARD_INITIALIZER, COLUMN_COLOR, COLUMN_ORDER_FROM_STATUS } from 'src/app/common/constants';
import { Board, SortedTasks, Task, TaskStatus } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';
import { allocateTasksToColumns } from '../../common/task_utils';

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

  allocatedTasks: SortedTasks = ALLOCATED_TASKS_INITIALIZER;
  columns: string[] = [];

  emptyBoardText = 'This board is empty.  Create a new column to get started.';

  public innerWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
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
          // this.allocateTasksToColumns();
          const {allocatedTasks, columns} = allocateTasksToColumns(this.boardBS.value);
          this.allocatedTasks = allocatedTasks;
          this.columns = columns;
        }
      });

      this.board$.pipe().subscribe(board => {
        // console.log('vB ctor board sub: ', board);
      });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
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
