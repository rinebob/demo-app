import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { BoardsService } from '../services/boards.service';
import { Board } from './interfaces';
import { BOARD_INITIALIZER } from './constants';

@Injectable({providedIn: 'root'})
export class BoardResolver implements Resolve<Board> {

    constructor(readonly boardsService: BoardsService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board> {

        const board = this.boardsService.getBoard(Number(route.paramMap.get('id') ?? 0));

        if (board) {
            console.log('r nR r resolved board: ', board);
            return board;

        } else {
            return of(BOARD_INITIALIZER);
        }


    }

}