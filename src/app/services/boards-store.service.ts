import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, switchMap, catchError, withLatestFrom, map } from 'rxjs/operators';

import { Board, BoardsState, Column, SortedTasks, Task } from '../common/interfaces';
import { BOARD_INITIALIZER, BOARDS_STORE_INITIALIZER } from '../common/constants';
import { BoardsService } from './boards.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class BoardsStore extends ComponentStore<BoardsState> {

  constructor(private boardsService: BoardsService) { 
    super(BOARDS_STORE_INITIALIZER)
  }

  readonly setBoards = this.updater((state, boards: Board[]) => ({
    ...state,
    boards: [...boards],
  }));

  readonly setSelectedBoard = this.updater((state, board: Board) => ({
    ...state,
    selectedBoard: {...board},
  }));

  // readonly setTasks = this.updater((state, tasks: Task[]) => ({
  //   ...state,
  //   tasks: [...tasks],
  // }));

  readonly setTasks = this.updater((state, tasks: Task[]) => {
    // console.log('bSt sT set tasks: ', tasks);
    return {
      ...state,
      tasks: [...tasks],
    }
  });

  readonly setallTasksByStatus = this.updater((state, sortedTasks: SortedTasks) => ({
    ...state,
    allTasksByStatus: {...sortedTasks},
  }));

  readonly setAllColumns = this.updater((state, columns: Column[]) => ({
    ...state,
    allColumns: [...columns],
  }));

  readonly setAllColumnsWithTasks = this.updater((state, columns: Column[]) => ({
    ...state,
    allColumnsWithTasks: [...columns],
  }));

  readonly setUserSelectedColumns = this.updater((state, columns: Column[]) => ({
    ...state,
    userSelectedColumns: [...columns],
  }));

  readonly reset = this.updater((state) => ({
    ...state,
    ...BOARDS_STORE_INITIALIZER
  }));

  readonly boards$: Observable<Board[]> = this.select((state: BoardsState) => state.boards);
  readonly selectedBoard$: Observable<Board> = this.select((state: BoardsState) => state.selectedBoard);
  readonly tasks$: Observable<Task[]|undefined> = this.select((state: BoardsState) => state.tasks);
  
  // readonly boards$: Observable<Board[]> = this.select((state: BoardsState) => state.boards).pipe(
  //   tap(boards => {console.log('bS boards$ value: ', boards)})
  // );

  // readonly selectedBoard$: Observable<Board> = this.select((state: BoardsState) => state.selectedBoard).pipe(
  //   tap(board => {console.log('bS selectedBoard$ value: ', board)})
  // );
  
  // readonly tasks$: Observable<Task[]|undefined> = this.select((state: BoardsState) => state.tasks).pipe(
  //   tap(tasks => {console.log('bsT t tasks obs: ', tasks)})
  // );
  
  
  readonly allTasksByStatus$: Observable<SortedTasks> = this.select((state: BoardsState) => state.allTasksByStatus);
  readonly allCols$: Observable<Column[]> = this.select((state: BoardsState) => state.allColumns);

  readonly allColumns$: Observable<Column[]> = this.select(
    this.allCols$,
    (columns) => {
      const newColumn = columns.find(col => col.name === 'new column');
      if (newColumn) {
        newColumn.display = true;
        const otherColumns = columns.filter(col => col.name !== 'new column');
        return [...otherColumns, newColumn];
      } else {
        return columns;
      }

    });

  readonly userSelectedColumns$: Observable<Column[]> = this.select((state: BoardsState) => state.userSelectedColumns);
  
  readonly allColumnsWithTasks$: Observable<Column[]> = this.select(
    this.allColumns$,
    this.allTasksByStatus$,
    (columns, tasksByStatus) => {
      const columnsWithTasks: Column[] = [];
      for (const [key, value] of Object.entries(tasksByStatus)) {
        if (value['length'] > 0) {
          const column = columns.find(col => col.name === key);
          if (column) {
            columnsWithTasks.push(column);

          }
        }
      }
      // console.log('bSt uSC store colums with tasks: ', columnsWithTasks);
      return columnsWithTasks;
    });
    
  readonly numberOfTasksPerColumn$: Observable<any> = this.select(
    this.allTasksByStatus$,
    (tasks: SortedTasks ) => {
      const numTasksByStatus: { [key: string]: number} = {};
      for (const [key, value] of Object.entries(tasks)) {
        numTasksByStatus[key] = value.length;
      }
      // console.log('bSt nOTPC num tasks by status: ', numTasksByStatus);
      return numTasksByStatus;
    });

    //////////////////// EFFECTS //////////////////////

    ///////////////////// BOARDS ///////////////////////////
  
  // getAllBoards
  readonly getAllBoards = this.effect<void>(
    trigger$ => trigger$.pipe(
        switchMap(() => this.boardsService.listBoards().pipe(
        tap(( boards) => {
          // firebase returns a DocumentData[] so need to cast
          const bds = boards as Board[];
          this.setBoards([...bds])
          console.log('bSt gAB all boards: ', boards);

          // in-mem web api
          // this.setBoards([...boards])
        }))))
  );

  readonly getAllBoardsForUser = this.effect<string>((userId$: Observable<string>) => {
    return userId$.pipe(
    switchMap((userId) => {
      console.log('bSt gABFU getting boards for user: ', userId);

      return this.boardsService.listBoardsForUser(userId).pipe(
        tap(( boards) => {
          // firebase returns a DocumentData[] so need to cast as Board[]
          const bds = boards as Board[];
          this.setBoards([...bds])
          console.log('bSt gAB boards from backend: ', boards);
        }))}
      ))
  });

  // getOneBoard from id
  readonly getBoard = this.effect((boardId$: Observable<number>) => {
    return boardId$.pipe(
      switchMap(boardId => this.boardsService.getBoard(boardId).pipe(
        tap(board => {
          // console.log('bSt gB get board: ', board);
          this.setSelectedBoard({...board});
        }),
        catchError(error => {
          // console.log('bSt gB error: ', error);
          return of(error);
        })
      ))
    )
  });

  // create board
  readonly createBoard = this.effect((board$: Observable<Board>) => {
    return board$.pipe(
      concatMap(board => this.boardsService.createBoard(board).pipe(
        tap((board) => {
          console.log('bSt cB created board: ', board);
          if (board.ownerUid) {
            console.log('bSt cB call get boards for user: ', board.ownerUid);
            this.getAllBoardsForUser(board.ownerUid);
            console.log('bSt cB after get boards call');
          }
          this.setSelectedBoard(board);
          
          // in-mem web api
          // this.setSelectedBoard({...board});
          // this.getAllBoards();
        }),
        catchError(error => {
          console.log('bSt gB error: ', error);
          return of(error);
        })
      ))
    )
  });

  readonly updateBoard = this.effect((board$: Observable<Board>) => {
    return board$.pipe(
      // tap(board => {
      //   this.setSelectedBoard({...board});
      //   console.log('bSt uB updated board: ', board);
      // }),
      concatMap((board) => this.boardsService.updateBoard(board).pipe(
        tap(board => {
          // console.log('bSt uB updated board: ', board);
        }),
        catchError(error => {
          console.log('bSt uB error: ', error);
          return of(error);
        })
      ))
    )
  });

  readonly deleteBoard = this.effect((boardId$: Observable<string | number>) => {
    return boardId$.pipe(
      concatMap((boardId) => this.boardsService.deleteBoard(boardId).pipe(
        tap(board => {
          // console.log('bSt uB updated board: ', board);
        }),
        catchError(error => {
          // console.log('bSt uB error: ', error);
          return of(error);
        })
      ))
    )
  });

  //////////////////// TASKS //////////////////////////////

  readonly getTasksForBoard = this.effect((boardId$: Observable<string|number>) => {
    return  boardId$.pipe(
        switchMap((boardId) => this.boardsService.getTasksForBoard(boardId).pipe(
        tap((tasks) => {
          // firebase returns a DocumentData[] so need to cast
          const tsks = tasks.slice() as Task[];
          this.setTasks([...tsks])
          // console.log('bSt gTFB tasks for board: ', boardId, tsks);

          // in-mem web api
          // this.setBoards([...boards])
        }))))

  });

  readonly createTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      withLatestFrom(this.selectedBoard$),
      concatMap(([task, board]) => {
        // console.log('bSt cT new task: ', task);
        
        return this.boardsService.createTask(task).pipe(
          tap(task => {
            // console.log('bSt cT created task: ', task);
          }),
          catchError(error => {
            // console.log('bSt cT error: ', error);
            return of(error);
          }))
      })
    )
  });

  readonly updateTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      concatMap(task => {
        // console.log('bSt uT updated task: ', task);
        return this.boardsService.updateTask(task).pipe(
          tap(task => {
            // console.log('bSt uT updated task after BE: ', task);
          }),
          catchError(error => {
            console.log('bSt uT error: ', error);
            return of(error);
          }))
      })
    )
  });

  readonly deleteTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      concatMap(task => {
        return this.boardsService.deleteTask(task).pipe(
          tap(task => {
            // console.log('bSt dT deleted task: ', task);
          }),
          catchError(error => {
            console.log('bSt dT error: ', error);
            return of(error);
          }))
      })
    )
  });
}
