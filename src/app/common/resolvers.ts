import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { BoardsService } from '../services/boards.service';
import { Board } from './interfaces';
import { BOARD_INITIALIZER } from './constants';

@Injectable({providedIn: 'root'})
export class BoardsResolver implements Resolve<Board[]> {

    constructor(readonly boardsService: BoardsService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board[]> {
        console.log('bR r boards resolver hit');

        // const boards = this.boardsService.listBoards();
        const boards: Board[] = [];
        this.boardsService.boards$.pipe().subscribe(boards => {

            if (boards) {
                console.log('r nR r resolved boards: ', boards);
                 boards = [...boards];
    
            } else {
                // return of([]);
            }

        });

        return of(boards);

        


    }

}
@Injectable({providedIn: 'root'})
export class BoardResolver implements Resolve<Board> {

    constructor(readonly boardsService: BoardsService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board> {
        console.log('bR r board resolver hit. id: ', route.paramMap.get('id'));

        const board = this.boardsService.getBoard(Number(route.paramMap.get('id') ?? 0));

        if (board) {
            // console.log('r nR r resolved board: ', board);
            return board;

        } else {
            return of(BOARD_INITIALIZER);
        }


    }

}