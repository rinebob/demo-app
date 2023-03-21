import { Injectable, inject } from '@angular/core';
import 'firebase/firestore';
import {Firestore, addDoc, collection, collectionData, doc, setDoc} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { RAW_BOARDS, RAW_TASKS } from '../testing/mock-task-data';
import { Board } from '../common/interfaces';
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
      // const boardDocRef = await addDoc(boardsCollnRef, newBoard);
      console.log('fBPS uD boardDocRef: ', boardDocRef);
      
      const tasksCollnRef = collection(this.db, `${BOARDS_COLLECTION}/${docRef.id}/${TASKS_COLLECTION}`);
      
      // console.log('---------- TASKS -----------');
      for (const task of RAW_TASKS) {
        // console.log('---------------------');
        const newTask = {...task};

        const taskDocRef = doc(tasksCollnRef);

        // console.log('creating task for board: ', newTask.description, board.displayName);
        // const newTask = this.removeId(task);
        newTask.id = taskDocRef.id;
        newTask.boardId = docRef.id;
        newTask.displayName = `${board.displayName} - ${newTask.displayName}`;
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
