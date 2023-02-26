import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs';
import { Board } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBoardComponent implements OnInit {

  board$: Observable<Board>;

  constructor(private boardsService: BoardsService, 
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('vB ngOI paramMap id: ', id);
    this.board$ = this.boardsService.getBoard(id ?? 0);
  }

  editBoard(boardId: number) {
    console.log('vB eB edit board. id: ', boardId);
    this.router.navigateByUrl(`edit/${boardId}`);
    
  }
  
  deleteBoard(boardId: number) {
    console.log('vB dB delete board. id: ', boardId);
    this.boardsService.deleteBoard(boardId);

  }

  editTask(taskId: number) {

    this.board$.pipe(take(1)).subscribe(board => {
      // this.boardsService.updateTaskInBoard(board.id, taskId)

    });


  }

  deleteTask(taskId: number) {

  }





}
