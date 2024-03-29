import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from, take } from 'rxjs';
import 'firebase/firestore';
import {DocumentData, Firestore, collection, collectionData, deleteDoc, doc, query, setDoc, updateDoc, where} from '@angular/fire/firestore';

import { Board, Task } from '../common/interfaces';
import { BOARDS_COLLECTION, TASKS_COLLECTION } from '../common/constants';

const BOARDS_BASE_URL = 'api/boards';

@Injectable({
  providedIn: 'any',
})
export class BoardsService  {

  db: Firestore = inject(Firestore);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // TODO: Refactor so methods are type agnostic.  Use generic typing

  // get all boards
  listBoards(): Observable<DocumentData[]> {
    console.log('bS lB list boards called');

    // FIREBASE
      const boards = collection(this.db, BOARDS_COLLECTION);
      return collectionData(boards);
      
      // const data = collectionData(boards);
      // data.subscribe(boards => {
      //   console.log('bS lB boards data sub: ', boards);
      // });
      

    // HTTP - DO NOT DELETE
    // Initializes the ang in-memory web api
    // return this.http.get<Board[]>(BOARDS_BASE_URL);
  }

  // get all boards for an authenticated user with userId (auth.uid)
  listBoardsForUser(userId: string): Observable<DocumentData[]> {
    console.log('bSvc lBFU list boards for user: ', userId);

    const boards = collection(this.db, BOARDS_COLLECTION);
    const q = query(boards, where('ownerUid', '==', userId));
    return collectionData(q);

    // const data = collectionData(q);
    // data.subscribe(boards => {
    //   console.log('bS lB boards data sub: ', boards);
    // });
  }

  // get one board
  getBoard(boardId: number): Observable<Board> {
    // FIREBASE


    
    
    
    
    // HTTP - DO NOT DELETE
    return this.http.get<Board>(`${BOARDS_BASE_URL}/${boardId}`);
  }

  createBoard(inputBoard: Board): Observable<Board> {
    // FIREBASE
    // console.log('bSvc cB inputBoard: ', inputBoard);
    const boardsCollectionRef = collection(this.db, BOARDS_COLLECTION);

    const docRef = doc(boardsCollectionRef);
    inputBoard.id = docRef.id;

    setDoc(docRef, inputBoard);
        
    return of(inputBoard);
    
    // HTTP - DO NOT DELETE
    // return this.http.post<Board>('api/boards', inputBoard, this.httpOptions);
  }

  // update board
  updateBoard(board: Board): Observable<DocumentData> {
    // console.log('bSvc uB called. board/id: ', board, board.id);

    if (board && board.id) {
      // FIREBASE
      // creates a reference to the collection
      const boardsCollectionRef = collection(this.db, BOARDS_COLLECTION);
      
      // creates a reference to the board document in the collection
      const updatedBoardDocRef = doc(boardsCollectionRef, board.id.toString());
      // console.log('bSvc uB updatedBoardDocRef: ', updatedBoardDocRef);
      
      updateDoc(updatedBoardDocRef, {...board});
      
      return of(board);
    
    } else {
      return of();
    }
        
    
    // HTTP - DO NOT DELETE
    // const url = `${BOARDS_BASE_URL}/${board.id}`
    // return this.http.put<Board>(url, board, this.httpOptions);
  }
  
  // delete board
  deleteBoard(boardId: string | number): Observable<void> {
    // console.log('bSvc dB called. boardId: ', boardId);

    // FIREBASE
    // creates a reference to the collection
    const boardsCollectionRef = collection(this.db, BOARDS_COLLECTION);
    
    // creates a reference to the board document in the collection
    const deleteBoardDocRef = doc(boardsCollectionRef, boardId.toString());
    // console.log('bSvc dB deleteBoardDocRef: ', deleteBoardDocRef);
    
    // Delete the tasks for this board
    this.getTasksForBoard(boardId).pipe(take(1)).subscribe(tasks => {
      if (tasks && tasks.length > 0) {
        // console.log('bSvc dB tasks to delete: ', tasks);
        
        for (const task of tasks as Task[]) {
          // console.log('bSvc dB deleting task with id: ', task['id']);

          this.deleteTask(task);
        }
      }

    });


    
    const deletedBoard = deleteDoc(deleteBoardDocRef);
    // console.log('bSvc dB deletedBoard: ', deletedBoard);
    
    // from(deletedBoard).pipe().subscribe(board => {
    //   // fyi board is undefined
    //   console.log('bSvc dB deletedBoard: ', board);
    // });
    
    return of();
    
    
    
    // HTTP - DO NOT DELETE
    // const url = `${BOARDS_BASE_URL}/${boardId}`
    // return this.http.delete<Board>(url, this.httpOptions);
  }

  /////////////////////////// TASKS ///////////////////////////

  // get all tasks from board
  getTasksForBoard(boardId: string|number): Observable<DocumentData[]> {
    // console.log('bSvc gTFB called. boardId: ', boardId);

    // FIREBASE
    const tasksCollnRef = collection(this.db, `${BOARDS_COLLECTION}/${boardId}/${TASKS_COLLECTION}`);
    const data = collectionData(tasksCollnRef);
    // console.log('bSvc gTFB observable of tasks for board: ', data);
    return data;
  }

  createTask(newTask: Task) {
    // console.log('bSvc cTIB create task in board. boardId/task: ', newTask.boardId, newTask);

    // FIREBASE
    const tasksCollnRef = collection(this.db, `${BOARDS_COLLECTION}/${newTask.boardId}/${TASKS_COLLECTION}`);
    const docRef = doc(tasksCollnRef);
    newTask.id = docRef.id;

    setDoc(docRef, newTask);
        
    return of(newTask);


    // HTTP - DO NOT DELETE    
    // const url = `${BOARDS_BASE_URL}/${newTask.boardId}/tasks`;
    // return this.http.post<Task>(url, newTask, this.httpOptions);
  }
  
  // update task in board
  updateTask(task: Task) {
    // console.log('bSvc uTIB update task in board. boardId/taskId/task: ', task.boardId, task.id, task);

    // FIREBASE
    const tasksCollnRef = collection(this.db, `${BOARDS_COLLECTION}/${task.boardId}/${TASKS_COLLECTION}`);
    const updatedTaskDocRef = doc(tasksCollnRef, task.id?.toString());
    // console.log('bSvc uB updatedTaskDocRef: ', updatedTaskDocRef);
    updateDoc(updatedTaskDocRef, {...task});
    return of(task);

    
    // HTTP - DO NOT DELETE
    // const url = `${BOARDS_BASE_URL}/${task.boardId}/tasks/${task.id}`;
    // this.http.put<Task>(url, task, this.httpOptions).subscribe(resp => {
    //   // console.log('bSvc uTIB update task resp: ', resp);
    //   const getTasksUrl = `${BOARDS_BASE_URL}/${task.id}/tasks`;
    //   this.http.get<Task[]>(getTasksUrl, this.httpOptions).subscribe(resp => {
    //     // console.log('bSvc uTIB tasks after update task: ', resp);
    //   });
    //   });
  }
  
  // delete task in board
  deleteTask(task: Task) {
    // console.log('bSvc dT delete task: ', task);

    // FIREBASE
    const tasksCollnRef = collection(this.db, `${BOARDS_COLLECTION}/${task.boardId}/${TASKS_COLLECTION}`);
    const deleteTaskDocRef = doc(tasksCollnRef, task.id?.toString());
    deleteDoc(deleteTaskDocRef);
    
    return of(task);


    // HTTP - DO NOT DELETE
    // const url = `${BOARDS_BASE_URL}/${boardId}/tasks/${taskId}`;
    // console.log('bSvc dTIB board url: ', url);

    // this.http.delete<Task>(url, this.httpOptions).subscribe(resp => {
      // console.log('bSvc dTIB create task resp: ', resp);

      // const getTasksUrl = `${BOARDS_BASE_URL}/${boardId}/tasks`;

      // this.http.get<Task[]>(getTasksUrl, this.httpOptions).subscribe(resp => {
        // console.log('bSvc dTIB tasks after create task: ', resp);
      // });
    //   }
    // );
  }
}
