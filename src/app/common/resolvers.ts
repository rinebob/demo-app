import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, of, takeUntil } from 'rxjs';

import { BoardsService } from '../services/boards.service';
import { Board } from './interfaces';
import { BOARD_INITIALIZER } from './constants';
import { BoardsStore } from '../services/boards-store.service';

@Injectable({providedIn: 'root'})
export class BoardsResolver implements OnDestroy, Resolve<Board[]> {
    readonly destroy$ = new Subject<void>()

    constructor(readonly boardsStore: BoardsStore) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board[]> {
        // console.log('bR r boards resolver hit');
        this.boardsStore.getAllBoards();
        const boards: Board[] = [];
        const boards$: Observable<Board[]> = this.boardsStore.boards$;
        boards$.pipe(takeUntil(this.destroy$)).subscribe(boards => {
            if (boards && boards.length > 0) {
                // console.log('r nR r resolved boards: ', boards);
                 boards = [...boards];
            } 
        });

        return of(boards);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }

}
// @Injectable({providedIn: 'root'})
// export class BoardResolver implements Resolve<Board> {

//     constructor(readonly boardsService: BoardsService) {

//     }
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board> {
//         console.log('bR r board resolver hit. id: ', route.paramMap.get('id'));

//         const board = this.boardsService.getBoard(Number(route.paramMap.get('id') ?? 0));

//         if (board) {
//             // console.log('r nR r resolved board: ', board);
//             return board;

//         } else {
//             return of(BOARD_INITIALIZER);
//         }


//     }

// }