import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, switchMap, catchError, withLatestFrom, map } from 'rxjs/operators';

import { Board, Column, SortedTasks, Task } from '../common/interfaces';
import { BOARD_INITIALIZER } from '../common/constants';
import { BoardsService } from './boards.service';

export interface BoardsState {
  boards: Board[];
  selectedBoard: Board;
  allTasksByStatus: SortedTasks;
  allColumns: Column[];
  allColumnsWithTasks: Column[];
  userSelectedColumns: Column[];
}

const BOARDS_STORE_INITIALIZER = {
  boards: [],
  selectedBoard: BOARD_INITIALIZER,
  allTasksByStatus: {},
  allColumns: [],
  allColumnsWithTasks: [],
  userSelectedColumns: [],
};

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

  readonly boards$: Observable<Board[]> = this.select((state: BoardsState) => state.boards);
  readonly selectedBoard$: Observable<Board> = this.select((state: BoardsState) => state.selectedBoard);
  
  // readonly boards$: Observable<Board[]> = this.select((state: BoardsState) => state.boards).pipe(
  //   tap(boards => {console.log('bS boards$ value: ', boards)})
  // );
  // readonly selectedBoard$: Observable<Board> = this.select((state: BoardsState) => state.selectedBoard).pipe(
  //   tap(board => {console.log('bS selectedBoard$ value: ', board)})
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


  // readonly allColumnsWithTasks$: Observable<Column[]> = this.select((state: BoardsState) => state.allColumnsWithTasks);
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
  
  // getAllBoards
  readonly getAllBoards = this.effect<void>(
    trigger$ => trigger$.pipe(
        switchMap(() => this.boardsService.listBoards().pipe(
        tap(( boards) => {
          this.setBoards([...boards])
          // console.log('bSt gAB all boards: ', boards);
        }))))
  );

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
      concatMap((board) => this.boardsService.createBoard(board).pipe(
        tap(board => {
          // this.addBoard({...board});
          this.setSelectedBoard({...board});
          this.getAllBoards();
          // console.log('bSt cB created board: ', board);
        }),
        catchError(error => {
          // console.log('bSt gB error: ', error);
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
          // this.setSelectedBoard({...board});
          this.getAllBoards()
        }),
        catchError(error => {
          console.log('bSt uB error: ', error);
          return of(error);
        })
      ))
    )
  });

  readonly deleteBoard = this.effect((boardId$: Observable<number>) => {
    return boardId$.pipe(
      concatMap((boardId) => this.boardsService.deleteBoard(boardId).pipe(
        tap(board => {
          this.getAllBoards()
          // console.log('bSt uB updated board: ', board);
        }),
        catchError(error => {
          // console.log('bSt uB error: ', error);
          return of(error);
        })
      ))
    )
  });

  readonly createTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      withLatestFrom(this.selectedBoard$),
      concatMap(([task, board]) => {
        // console.log('bSt cT new task: ', task);
        // console.log('bSt cT selectedBoard: ', board);
        
        const title = `${board.displayName} - ${task.displayName}`;
        task.displayName = title;
        // console.log('bSt cT task with new title: ', task);
        
        const existingTasks = board.tasks ? board.tasks : [];
        // console.log('bSt cT existing tasks: ', existingTasks);
        task.id = existingTasks.length + 1;
        existingTasks.push(task);
        board.tasks = [...existingTasks];
        // console.log('bSt cT board with task: ', board, board.tasks);
        
        return this.boardsService.updateBoard(board).pipe(
          tap(task => {
            this.getAllBoards();
            // console.log('bSt cT created task: ', task);
          }),
          catchError(error => {
            // console.log('bSt cT error: ', error);
            return of(error);
          })
        )})
    )
  });

  // readonly createTask = this.effect((task$: Observable<Task>) => {
  //   return task$.pipe(
  //     withLatestFrom(this.selectedBoard$),
  //     map(([task, board]) => {
  //       const updatedTasks = board.tasks ? [...board.tasks, task] : [task];
  //       board.tasks = [...updatedTasks];
  //       return board;
  //     }),
  //     concatMap((board) => this.boardsService.updateBoard(board)),
  //     tap(board => {
  //         this.getAllBoards();
  //         console.log('bSt cB created task in board: ', board);
  //       }),
  //     catchError(error => {
  //         console.log('bSt gB error: ', error);
  //         return of(error);
  //       })
  //     )
  // });

  readonly updateTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      withLatestFrom(this.selectedBoard$),
      concatMap(([task, board]) => {
        // console.log('bSt uT new task: ', task);
        // console.log('bSt uT selectedBoard: ', board);
        
        const existingTasks = board.tasks ? board.tasks.filter(t => t.id !== task.id) : [];
        // console.log('bSt uT existing tasks: ', existingTasks);
        
        existingTasks.push(task);
        board.tasks = [...existingTasks];
        // console.log('bSt uT board with task: ', board, board.tasks);
        
        return this.boardsService.updateBoard(board).pipe(
          tap(task => {
            this.getAllBoards();
            // console.log('bSt uT updated task: ', task);
          }),
          catchError(error => {
            // console.log('bSt uT error: ', error);
            return of(error);
          })
        )})
    )
  });

  readonly deleteTask = this.effect((taskId$: Observable<number>) => {
    return taskId$.pipe(
      withLatestFrom(this.selectedBoard$),
      concatMap(([taskId, board]) => {
        // console.log('bSt dT task id to delete: ', taskId);
        // console.log('bSt dT selectedBoard: ', board);
        
        const remainingTasks = board.tasks ? board.tasks.filter(t => t.id !== taskId) : [];
        // console.log('bSt uT remaining tasks: ', [...remainingTasks]);

        board.tasks = [...remainingTasks];
        
        // console.log('bSt uT board after delete task: ', board, [...board.tasks]);
        
        return this.boardsService.updateBoard(board).pipe(
          tap( _ => {
            this.getAllBoards();
          }),
          catchError(error => {
            console.log('bSt dT error: ', error);
            return of(error);
          })
        )})
    )
  });
}
