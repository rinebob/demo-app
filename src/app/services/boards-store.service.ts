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
  readonly allColumns$: Observable<Column[]> = this.select((state: BoardsState) => state.allColumns);
  readonly allColumnsWithTasks$: Observable<Column[]> = this.select((state: BoardsState) => state.allColumnsWithTasks);
  readonly userSelectedColumns$: Observable<Column[]> = this.select((state: BoardsState) => state.userSelectedColumns);
    
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
          console.log('bSt gB error: ', error);
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
          console.log('bSt uB error: ', error);
          return of(error);
        })
      ))
    )
  });


  readonly createTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      concatMap((task) => this.boardsService.createTask(task).pipe(
        tap(task => {
          this.getAllBoards();
          // console.log('bSt cB created task: ', task);
        }),
        catchError(error => {
          // console.log('bSt gB error: ', error);
          return of(error);
        })
      ))
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

}
