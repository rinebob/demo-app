import { Injectable, inject } from '@angular/core';
import 'firebase/firestore';
import {Firestore, collection, doc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { RAW_BOARDS, RAW_TASKS, RAW_SUBTASKS } from '../testing/mock-task-data';
import { SubTask } from '../common/interfaces';
import { BOARDS_COLLECTION, TASKS_COLLECTION } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class FbProjectsService {

  db: Firestore = inject(Firestore);
  projects$: Observable<any[]>;
  
  async uploadData() {
    // console.log('fBPS uD upload data called');
    const boardsCollnRef = collection(this.db, 'boards');
    // console.log('fBPS uD boards colln ref: ', boardsCollnRef);
    
    for (let board of Object.values(RAW_BOARDS)) {

      // console.log('--------- BOARD ------------');
      // console.log('fBPS uD creating board: ', board.displayName);
      
      const newBoard = this.removeId(board);
      // console.log('fBPS uD newBoard: ', newBoard);
      
      const docRef = doc(boardsCollnRef);
      // console.log('fBPS uD docRef/id: ', docRef, docRef.id);

      newBoard.id = docRef.id;
      
      const boardDocRef = setDoc(docRef, newBoard);
      // console.log('fBPS uD boardDocRef: ', boardDocRef);
      
      const tasksCollnRef = collection(this.db, `${BOARDS_COLLECTION}/${docRef.id}/${TASKS_COLLECTION}`);
      
      // console.log('---------- TASKS -----------');
      let firstTask = true;
      for (const task of RAW_TASKS) {
        // console.log('---------------------');
        const newTask = {...task};

        const taskDocRef = doc(tasksCollnRef);

        // console.log('creating task for board: ', newTask.description, board.displayName);
        // const newTask = this.removeId(task);
        newTask.id = taskDocRef.id;
        newTask.boardId = docRef.id;
        newTask.displayName = `${board.displayName} - ${newTask.displayName}`;

        // console.log('---------------------');
        let numSubtasksToInclude = Math.floor(Math.random() * RAW_SUBTASKS.length);
        // console.log('fBPS uD numSubtasksToInclude: ', numSubtasksToInclude);

        if (firstTask) {
          numSubtasksToInclude = RAW_SUBTASKS.length;
          firstTask = false;
        } else {
          numSubtasksToInclude = numSubtasksToInclude < 2 ? RAW_SUBTASKS.length : numSubtasksToInclude;
        }

        let indicesToInclude: number[] = [];

        while (indicesToInclude.length < numSubtasksToInclude) {
          const index = Math.floor(Math.random() * RAW_SUBTASKS.length);
          // console.log('fbPS uD index: ', index);
          if (!indicesToInclude.includes(index)) {
            indicesToInclude.push(index);
          }
        }

        // console.log('fBPS uD indicesToInclude pre sort: ', indicesToInclude);
        
        indicesToInclude.sort(sortAscending);
        
        // console.log('fBPS uD indicesToInclude post sort: ', indicesToInclude);
        
        const subtasks: SubTask[] = [];
        for (const index of indicesToInclude.values()) {
          // console.log('fBPS uD including index: ', index);
          subtasks.push(RAW_SUBTASKS[index]);
        }

        newTask.subTasks = [...subtasks];
        
        // console.log('fBPS uD subtasks post include: ', newTask.subTasks);

        // console.log('fBPS uD newTask: ', newTask);

        setDoc(taskDocRef, newTask);
        // console.log('fBPS uD newTask post id: ', newTask);
        // console.log('fBPS uD taskDocRef: ', taskDocRef);
      }
    }
  }

  removeId(data: any) {
      const newData: any = {...data};
      delete newData.id;
      return newData;
  }
}

function sortAscending(a: number, b: number) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
