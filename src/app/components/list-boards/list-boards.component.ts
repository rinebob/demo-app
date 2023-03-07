import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Board } from 'src/app/common/interfaces';
import { BoardsStore } from 'src/app/services/boards-store.service';

@Component({
  selector: 'app-list-boards',
  templateUrl: './list-boards.component.html',
  styleUrls: ['./list-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBoardsComponent implements OnInit {
  
  boards$: Observable<Board[]> = this.boardsStore.boards$;

  constructor(private boardsStore: BoardsStore) {}

  ngOnInit(): void {}

  viewBoard(boardId: number) {
    // this.router.navigate(['view', boardId]);
  }
  
  createNewBoard() {
    // console.log('lB cNB create new board called');
    // this.router.navigateByUrl('create');

  }

}
