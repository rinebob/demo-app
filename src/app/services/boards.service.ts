import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { Board, Task, TaskStatus } from '../common/interfaces';
// import { BOARDS, TASKS } from '../testing/mock-task-data';
// import { buildBoardsAndTasks } from '../common/task_utils';

const BOARDS_BASE_URL = 'api/boards';
const TASKS_BASE_URL = 'api/tasks';

@Injectable({
  providedIn: 'root'
})
export class BoardsService  {
  // boards$: Observable<Board[]>;
  // tasks$: Observable<Task[]>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  // get all boards
  listBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(BOARDS_BASE_URL);
  }

  // get one board
  getBoard(boardId: number): Observable<Board> {
    const board = this.http.get<Board>(`${BOARDS_BASE_URL}/${boardId}`);
    console.log('bS gB called. boardId: ', boardId, board);
    return board;
    // return this.http.get<Board>(`${BOARDS_BASE_URL}/${boardId}`);
  }

  // add board
  createBoard(board: Board) {
    console.log('bS cB called. board: ', board);
    this.http.post<Board>('api/boards', board, this.httpOptions).subscribe(resp => {
      console.log('bS cB create resp: ', resp);

      this.http.get<Board[]>('api/boards').subscribe(resp => {
        console.log('bS cB boards after post: ', resp);
      });
      }


    );

  }

  // update board
  updateBoard(board: Board) {
    console.log('bS uB called. board: ', board);
    const url = `${BOARDS_BASE_URL}/${board.id}`
    
    this.http.put<Board>(url, board, this.httpOptions).subscribe(resp => {
      console.log('bS uB update resp: ', resp);
      
      this.http.get<Board[]>('api/boards').subscribe(resp => {
        console.log('bS uB boards after put: ', resp);
      });
      
    });
    // return this.http.put<Board>('boards', updatedBoard);
    
  }
  
  // delete board
  deleteBoard(boardId: number) {
    console.log('bS dB called. boardId: ', boardId);
    // this.http.delete<Board>(`${BOARDS_BASE_URL}/${boardId}`);
    
    const url = `${BOARDS_BASE_URL}/${boardId}`
    this.http.delete<Board>(url, this.httpOptions).subscribe(resp => {
      console.log('bS uB delete resp: ', resp);
      
      this.http.get<Board[]>('api/boards').subscribe(resp => {
        console.log('bS dB boards after delete: ', resp);
      });
      
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
  createTaskInBoard(boardId: number, newTask: Task) {}

  // update task in board
  updateTaskInBoard(boardId: number, updatedTask: Task) {}

  // delete task in board
  deleteTaskInBoard(boardId: number, taskId: number) {}

}
