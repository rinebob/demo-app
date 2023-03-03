import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { Board, Task, TaskStatus } from '../common/interfaces';
import { BOARD_INITIALIZER } from '../common/constants';
// import { BOARDS, TASKS } from '../testing/mock-task-data';
// import { buildBoardsAndTasks } from '../common/task_utils';

const BOARDS_BASE_URL = 'api/boards';
const TASKS_BASE_URL = 'api/tasks';

@Injectable({
  providedIn: 'root'
})
export class BoardsService  {

  boardsBS = new BehaviorSubject<Board[]>([]);
  boards$: Observable<Board[]> = this.boardsBS;
  
  selectedBoardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  selectedBoard$: Observable<Board> = this.selectedBoardBS;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  // get all boards
  listBoards(): void {
    this.http.get<Board[]>(BOARDS_BASE_URL).pipe().subscribe(boards => {
      // console.log('bS lB boards service list sub: ', boards);
      this.setBoards(boards);
    });
  }

  setBoards(boards: Board[]) {
    // console.log('bS sB set boards called');
    this.boardsBS.next(boards);
    if (this.selectedBoardBS.value && this.selectedBoardBS.value.id !== -1) {
      this.setSelectedBoard(this.selectedBoardBS.value.id);
    } else {
      this.setSelectedBoard(1);
      
    }
  }

  setSelectedBoard(boardId?: number) {
    if (this.boardsBS.value.length > 0) {
      const selectedBoard = this.boardsBS.value.find(board => board.id === boardId);
      if (selectedBoard) {
        this.selectedBoardBS.next(selectedBoard);
        // console.log('bS lB update selected board: ', selectedBoard);
        
      } else {
        this.selectedBoardBS.next(this.boardsBS.value[0]);
        // console.log('bS lB no selected board yet.  setting to: ', this.selectedBoardBS.value);
      }

    }
    

  }

  // get one board
  getBoard(boardId: number): Observable<Board> {
    const board = this.http.get<Board>(`${BOARDS_BASE_URL}/${boardId}`);
    // console.log('bS gB called. boardId: ', boardId, board);
    return board;
    // return this.http.get<Board>(`${BOARDS_BASE_URL}/${boardId}`);
  }

  // add board
  createBoard(inputBoard: Board) {
    // console.log('bS cB called. board: ', inputBoard);
    this.http.post<Board>('api/boards', inputBoard, this.httpOptions).subscribe(resp => {
      // console.log('bS cB create resp: ', resp);
      this.refreshSelectedBoard(inputBoard);
      }
    );
  }

  // update board
  updateBoard(board: Board) {
    // console.log('bS uB called. board: ', board);
    const url = `${BOARDS_BASE_URL}/${board.id}`
    
    this.http.put<Board>(url, board, this.httpOptions).subscribe(resp => {
      // console.log('bS uB update resp: ', resp);
      
      this.http.get<Board[]>('api/boards').subscribe(boards => {
        // console.log('bS uB boards after put: ', boards);
        this.setBoards(boards);
      });
      
    });
  }
  
  // delete board
  deleteBoard(boardId: number) {
    console.log('bS dB called. boardId: ', boardId);
    // this.http.delete<Board>(`${BOARDS_BASE_URL}/${boardId}`);
    
    const url = `${BOARDS_BASE_URL}/${boardId}`
    this.http.delete<Board>(url, this.httpOptions).subscribe(resp => {
      // console.log('bS uB delete resp: ', resp);
      
      this.http.get<Board[]>('api/boards').subscribe(boards => {
        // console.log('bS uB boards after put: ', boards);
        this.setBoards(boards);
      });
      
    });

  }

  refreshSelectedBoard(inputBoard: Board) {
    this.http.get<Board[]>('api/boards').subscribe(boards => {
      // console.log('bS rSB boards after post: ', boards);
      this.setBoards(boards);
      const board: Board | undefined = boards.find(b => b.displayName === inputBoard.displayName);

      if (board && board.id && board.id !== -1) {
        this.setSelectedBoard(board.id);
      } else {
        this.setSelectedBoard(1);
      }

    });
  }


  // get all tasks for all boards
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(TASKS_BASE_URL);
    

  }

  // get all tasks from board
  getTasksFromBoard(boardId: number): Observable<Task[]> {
    console.log('bS gTFB called. boardId: ', boardId);
    const url = `${BOARDS_BASE_URL}/${boardId}`;
    console.log('bS gTFB board url: ', url);
    
    return this.http.get<Board>(url).pipe(
      switchMap(board => {
        // use this technique if task objects are not stored in the board object
        // console.log('bS gTFB board: ', board);
        // console.log('bS gTFB url: ', url);
        // const taskIds = board.tasks.map(task => task.id);
        // const requests = taskIds.map(taskId => this.http.get<Task>(`${TASKS_BASE_URL}/${taskId}`));
        // return forkJoin(requests);

        // use this technique if task objects are stored in the board object
        return of(board.tasks ?? []);
      })
    );
  }

  // get one task from board
  getTaskFromBoard(boardId: number, taskId: number) {

  }

  // add task to board
  createTaskInBoard(boardId: number, newTask: Task) {
    // console.log('bS cTIB create task in board. boardId/task: ', boardId, newTask);

    const url = `${BOARDS_BASE_URL}/${boardId}/tasks`;
    // console.log('bS gTFB board url: ', url);

    this.http.post<Task>(url, newTask, this.httpOptions).subscribe(resp => {
      // console.log('bS cT create task resp: ', resp);

      this.http.get<Task[]>(url, this.httpOptions).subscribe(resp => {
        // console.log('bS cB tasks after create task: ', resp);
      });
      }
    );
  }
  
  // update task in board
  updateTaskInBoard(boardId: number, taskId: number, task: Task) {
    // console.log('bS uTIB update task in board. boardId/taskId/task: ', boardId, taskId, task);

    const url = `${BOARDS_BASE_URL}/${boardId}/tasks/${taskId}`;
    // console.log('bS uTIB board url: ', url);

    this.http.put<Task>(url, task, this.httpOptions).subscribe(resp => {
      // console.log('bS uTIB update task resp: ', resp);

      const getTasksUrl = `${BOARDS_BASE_URL}/${boardId}/tasks`;

      this.http.get<Task[]>(getTasksUrl, this.httpOptions).subscribe(resp => {
        // console.log('bS uTIB tasks after update task: ', resp);
      });
      }
    );

    
  }
  
  // delete task in board
  deleteTaskInBoard(boardId: number, taskId: number) {
    // console.log('bS dTIB delete task in board. boardId/taskId: ', boardId, taskId);

    const url = `${BOARDS_BASE_URL}/${boardId}/tasks/${taskId}`;
    // console.log('bS dTIB board url: ', url);

    this.http.delete<Task>(url, this.httpOptions).subscribe(resp => {
      // console.log('bS dTIB create task resp: ', resp);

      const getTasksUrl = `${BOARDS_BASE_URL}/${boardId}/tasks`;

      this.http.get<Task[]>(getTasksUrl, this.httpOptions).subscribe(resp => {
        // console.log('bS dTIB tasks after create task: ', resp);
      });
      }
    );


  }

}
