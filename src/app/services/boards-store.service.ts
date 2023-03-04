import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, switchMap, catchError } from 'rxjs/operators';

import { Board } from '../common/interfaces';
import { BOARD_INITIALIZER } from '../common/constants';
import { BoardsService } from './boards.service';

export interface BoardsState {
  boards: Board[];
  selectedBoard: Board;
}

const BOARDS_STORE_INITIALIZER = {boards: [], selectedBoard: BOARD_INITIALIZER};

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

  readonly boards$: Observable<Board[]> = this.select((state: BoardsState) => state.boards);
  readonly selectedBoard$: Observable<Board> = this.select((state: BoardsState) => state.selectedBoard);

  // readonly boards$: Observable<Board[]> = this.select((state: BoardsState) => state.boards).pipe(
  //   tap(boards => {console.log('bS boards$ value: ', boards)})
  // );
  // readonly selectedBoard$: Observable<Board> = this.select((state: BoardsState) => state.selectedBoard).pipe(
  //   tap(board => {console.log('bS selectedBoard$ value: ', board)})
  // );

  // getAllBoards
  readonly getAllBoards = this.effect<void>(
    trigger$ => trigger$.pipe(
        switchMap(() => this.boardsService.listBoards().pipe(
        tap(( boards) => {
          this.setBoards([...boards])
          console.log('bSt gAB all boards: ', boards);
        }))))
  );

  // getOneBoard from id
  readonly getBoard = this.effect((boardId$: Observable<number>) => {
    return boardId$.pipe(
      switchMap(boardId => this.boardsService.getBoard(boardId).pipe(
        tap(board => {
          console.log('bSt gB get board: ', board);
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
          console.log('bSt cB created board: ', board);
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
      concatMap((board) => this.boardsService.updateBoard(board).pipe(
        tap(board => {
          this.setSelectedBoard({...board});
          this.getAllBoards()
          console.log('bSt uB updated board: ', board);
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
          console.log('bSt uB updated board: ', board);
        }),
        catchError(error => {
          console.log('bSt uB error: ', error);
          return of(error);
        })
      ))
    )
  });






}
