import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Board } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-list-boards',
  templateUrl: './list-boards.component.html',
  styleUrls: ['./list-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBoardsComponent implements OnInit {
  
  boards$: Observable<Board[]>;

  constructor(private boardsService: BoardsService, 
    private router: Router,
    private route: ActivatedRoute
    ) {

  }

  ngOnInit(): void {
    this.boards$ = this.boardsService.listBoards();
    
    
  }

  viewBoard(boardId: number) {
    this.router.navigate(['boards', boardId]);
  }
  
  createNewBoard() {
    console.log('lB cNB create new board called');
    this.router.navigateByUrl('create');

  }

}
