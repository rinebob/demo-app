import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Board, Entity, Task } from '../common/interfaces';
import { BOARDS, RAW_BOARDS, RAW_TASKS } from '../testing/mock-task-data';
import { buildBoardsAndTasks } from '../common/task_utils';

@Injectable({
  providedIn: 'root'
})
export class ImBoardsTasksService  implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo) {
    // Generates a raw data set.  After adding boards and/or tasks, uncomment this and
    // let the utility construct a raw data set.
    // const {boards, tasks} = buildBoardsAndTasks(RAW_BOARDS, RAW_TASKS);

    // Copy the output from the console and paste it into the BOARDS array in
    // mock-task-data.ts
    // console.log('iMBTS cDB boards: ', boards);
    
    // Use the mock data in the in-memory-web-api
    const boards = [...BOARDS];
    // console.log('iMBT p requst info: ', reqInfo);
    
    return {boards};
  }

  post(reqInfo: RequestInfo) {
    console.log('iMBT post requst info: ', reqInfo);
  }
  
  put(reqInfo: RequestInfo) {
    console.log('iMBT put requst info: ', reqInfo);
  }

  delete(reqInfo: RequestInfo) {
    console.log('iMBT delete requst info: ', reqInfo);
  }

  // createBoard(board: Board) {
  //   board.id = this.generateId(this.createDb().boards); // generate a unique id for the new board
  //   return this.http.post<Board>('api/boards', board);
  // }

  // // This method generates a unique id for a new board.
  // // If the list of boards is empty, it returns 1. Otherwise, it returns the highest id + 1.
  // generateId(entities: Entity[]): string {
  //   if (entities.length > 0) {
  //       const id = (Math.max(...entities.map(entity => +(entity.id ?? 0)))).toString();
  //       console.log('iMBTS gI generated id for board: ', id);
  //       return id;
  //   } else {
  //       return '1';
  //   }
  // }

  // private genId(): string {
  //   const boards: Board[] = this.createDb().boards;
  //   return boards.length > 0 ? ((Math.max(...boards.map(board => +board.id ?? 0))) + 1).toString : '1';
  // }
}
