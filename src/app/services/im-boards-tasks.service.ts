import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Board, Entity, Task } from '../common/interfaces';
import { BOARDS, RAW_BOARDS, RAW_TASKS, RAW_SUBTASKS } from '../testing/mock-task-data';
import { buildBoardsAndTasks } from '../common/task_utils';

@Injectable({
  providedIn: 'root'
})
export class ImBoardsTasksService  implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo) {
    ////// DO NOT DELETE ////////
    // Generates a raw data set.  After adding boards and/or tasks, uncomment this and
    // let the utility construct a raw data set.
    // const {boards} = buildBoardsAndTasks(RAW_BOARDS, RAW_TASKS, RAW_SUBTASKS);
    // console.log('iMBTS cDB boards: ', boards);

    // Copy the output from the console and paste it into the BOARDS array in
    // mock-task-data.ts.  This is the data source for the mock data in the
    //  in-memory-web-api
    const boards = [...BOARDS];
    // console.log('iMBT p requst info: ', reqInfo);

    ////// END DO NOT DELETE ////////
    
    return {boards};
  }

  post(reqInfo: RequestInfo) {
    // console.log('iMBT post requst info: ', reqInfo);
  }
  
  put(reqInfo: RequestInfo) {
    // console.log('iMBT put requst info: ', reqInfo);
  }

  delete(reqInfo: RequestInfo) {
    // console.log('iMBT delete requst info: ', reqInfo);
  }
}
