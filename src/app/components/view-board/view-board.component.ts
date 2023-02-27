import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs';
import { BOARD_INITIALIZER } from 'src/app/common/constants';
import { Board, Task } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBoardComponent implements OnInit {

  boardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  board$: Observable<Board> = this.boardBS;

  tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksBS;

  constructor(private boardsService: BoardsService, 
    private router: Router,
    private route: ActivatedRoute) {

      this.route.data.pipe().subscribe(data => {
        console.log('vB ctor route data: ', data);
        if (data && data['board'] && data['board'].displayName !== '') {
          console.log('vB ctor selected board from route: ', data['board']);
          this.boardBS.next(data['board']);
          const tasks = this.boardBS.value.tasks;
          console.log('vB ctor tasks from board: ', tasks);
        }
      });

      this.board$.pipe().subscribe(board => {
        console.log('vB ctor board sub: ', board);
      });



  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('vB ngOI paramMap id: ', id);
    // this.board$ = this.boardsService.getBoard(id ?? 0);
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
